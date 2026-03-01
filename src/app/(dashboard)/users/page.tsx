"use client";
import React, { useState, useEffect, useMemo } from 'react';

import {User} from "@/src/features/Components/types";
import {Role} from "@/src/features/RuleRestrictions/permissions";
import {
    createUserAction,
    deleteUserAction,
    getAllUsersAction,
    updateUserAction
} from "@/src/features/api/actions/users/userActions";
import {_Sidebar} from "@/src/widgets/partial/_Sidebar";

// Интерфейс пользователя с обязательными полями

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // Состояния для фильтров
    const [filters, setFilters] = useState({ name: '', role: '' });

    // Состояния для модальных окон
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Состояние нового пользователя (сразу с дефолтными значениями)
    const [newUser, setNewUser] = useState<User>({
        name: '', email: '', password: '', group: '',
        course: '1', nameEducationalinstItution: '',
        role: Role.STUDENT,
        avatar : ''
    });

    // Загрузка при старте
    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        const data = await getAllUsersAction();

        // Мапим данные: если пришла строка "admin", превращаем в 3 и так далее
        const normalizedData = data.map((user: any) => ({
            ...user,
            role: user.role === 'admin' || user.role === 'Admin' ? Role.ADMIN :
                user.role === 'teacher' ? Role.TEACHER : Role.STUDENT
        }));

        setUsers(normalizedData);
        setLoading(false);
    };

    // 1. Создание пользователя
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserAction(newUser);
            setIsCreateOpen(false);
            // Сбрасываем форму
            setNewUser({
                name: '',
                email: '',
                password: '',
                group: '',
                course: '',
                nameEducationalinstItution: '',
                role : Role.STUDENT,
                avatar : ''
            });
            await fetchUsers();
        } catch (error) {
            alert("Ошибка при создании пользователя");
        }
    };

    // 2. Обновление пользователя
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser?.id) {
            try {
                await updateUserAction(editingUser.id, editingUser);
                setEditingUser(null);
                await fetchUsers();
            } catch (error) {
                alert("Ошибка при обновлении");
            }
        }
    };

    // 3. Удаление пользователя
    const handleDelete = async (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этого пользователя навсегда?")) {
            await deleteUserAction(id);
            await fetchUsers();
        }
    };

    // 4. Фильтрация (надежная)
    const processedUsers = useMemo(() => {
        console.log(users);
        return users.filter(u => {
            // Защита от undefined в имени
            const safeName = (u.name || '').toLowerCase();
            const matchName = safeName.includes(filters.name.toLowerCase());

            // Сравниваем роль (filters.role — это строка из select, u.role — число Enum)
            const matchRole = filters.role === '' || u.role.toString() === filters.role;

            return matchName && matchRole;
        });
    }, [users, filters]);

    return (
        <div className="flex h-screen bg-slate-50">
            {/* САЙДБАР */}
            <_Sidebar />

            {/* ОСНОВНОЙ КОНТЕНТ */}
            <main className="flex-1 overflow-y-auto p-8 bg-white rounded-l-[3rem] shadow-2xl my-2 mr-2 border border-slate-100">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Users.Directory</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Полный контроль доступа</p>
                    </div>
                    <button
                        onClick={() => setIsCreateOpen(true)}
                        className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/30"
                    >
                        + Добавить
                    </button>
                </header>

                {/* ПАНЕЛЬ ФИЛЬТРОВ */}
                <div className="flex gap-4 mb-8">
                    <input
                        placeholder="ПОИСК ПО ИМЕНИ..."
                        className="filter-input flex-1"
                        value={filters.name}
                        onChange={(e) => setFilters({...filters, name: e.target.value})}
                    />
                    <select
                        className="filter-input w-64 appearance-none"
                        value={filters.role}
                        onChange={(e) => setFilters({...filters, role: e.target.value})}
                    >
                        <option value="">ВСЕ РОЛИ</option>
                        <option value={Role.STUDENT}>STUDENT</option>
                        <option value={Role.TEACHER}>TEACHER</option>
                        <option value={Role.ADMIN}>ADMIN</option>
                    </select>
                </div>

                {/* ТАБЛИЦА */}
                <div className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                        <tr>
                            <th className="p-5">User & Contact</th>
                            <th className="p-5">Role</th>
                            <th className="p-5">Education Info</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {processedUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-5 flex items-center gap-4">
                                    <img src={user.avatar || 'https://via.placeholder.com/40'} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-sm" alt="" />
                                    <div>
                                        <p className="font-black text-slate-800 text-xs uppercase">{user.name}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                                    </div>
                                </td>
                                <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${
                        user.role === Role.ADMIN ? 'bg-rose-50 border-rose-200 text-rose-600' :
                            user.role === Role.TEACHER ? 'bg-amber-50 border-amber-200 text-amber-600' :
                                'bg-indigo-50 border-indigo-200 text-indigo-600'
                    }`}>
                      {Role[user.role] || 'UNKNOWN'}
                    </span>
                                </td>
                                <td className="p-5">
                                    <p className="text-[10px] font-bold text-slate-700 uppercase">{user.nameEducationalinstItution}</p>
                                    <p className="text-[9px] text-slate-400 mt-1">Курс: {user.course} | Группа: {user.group}</p>
                                </td>
                                <td className="p-5 text-right space-x-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="p-3 bg-slate-100 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors text-xs"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id!)}
                                        className="p-3 bg-slate-100 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors text-xs"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {processedUsers.length === 0 && !loading && (
                            <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-black uppercase text-xs">Ничего не найдено</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* ------------------------------------------- */}
                {/* МОДАЛКА: СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ */}
                {/* ------------------------------------------- */}
                {isCreateOpen && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border-2 border-slate-100">
                            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                                <h2 className="text-xl font-black uppercase italic tracking-tighter">New.User_Registration</h2>
                                <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white transition-colors">✕</button>
                            </div>
                            <form onSubmit={handleCreate} className="p-10 grid grid-cols-2 gap-5">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">ФИО</label>
                                    <input required className="form-input" placeholder="Иван Иванов" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Email (Логин)</label>
                                    <input required type="email" className="form-input" placeholder="mail@edu.com" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Пароль</label>
                                    <input required type="password" className="form-input" placeholder="••••••••" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Роль</label>
                                    <select className="form-input" value={newUser.role} onChange={e => setNewUser({...newUser, role: Number(e.target.value) as Role})}>
                                        <option value={Role.STUDENT}>STUDENT</option>
                                        <option value={Role.TEACHER}>TEACHER</option>
                                        <option value={Role.ADMIN}>ADMIN</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">Курс</label>
                                    <input type="number" min="1" max="6" className="form-input" value={newUser.course} onChange={e => setNewUser({...newUser, course: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">Группа</label>
                                    <input className="form-input" placeholder="A, B, C" value={newUser.group} onChange={e => setNewUser({...newUser, group: e.target.value})} />
                                </div>
                                <div className="col-span-2">
                                    <label className="form-label">Учебное заведение</label>
                                    <input className="form-input" placeholder="Название ВУЗа/Школы" value={newUser.nameEducationalinstItution} onChange={e => setNewUser({...newUser, nameEducationalinstItution: e.target.value})} />
                                </div>
                                <div className="col-span-2 pt-4 flex gap-4">
                                    <button type="submit" className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all">
                                        Зарегистрировать
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ------------------------------------------- */}
                {/* МОДАЛКА: РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ */}
                {/* ------------------------------------------- */}
                {editingUser && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border-2 border-slate-100">
                            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                                <h2 className="text-xl font-black uppercase italic tracking-tighter">Edit.User_Profile</h2>
                                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white transition-colors">✕</button>
                            </div>
                            <form onSubmit={handleUpdate} className="p-10 grid grid-cols-2 gap-5">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">ФИО</label>
                                    <input required className="form-input" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Email</label>
                                    <input required type="email" className="form-input" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Роль</label>
                                    <select className="form-input" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: Number(e.target.value) as Role})}>
                                        <option value={Role.STUDENT}>STUDENT</option>
                                        <option value={Role.TEACHER}>TEACHER</option>
                                        <option value={Role.ADMIN}>ADMIN</option>
                                    </select>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="form-label">Учебное заведение</label>
                                    <input className="form-input" value={editingUser.nameEducationalinstItution} onChange={e => setEditingUser({...editingUser, nameEducationalinstItution: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">Курс</label>
                                    <input type="number" min="1" max="6" className="form-input" value={editingUser.course} onChange={e => setEditingUser({...editingUser, course: e.target.value})} />
                                </div>
                                <div className="col-span-1">
                                    <label className="form-label">Группа</label>
                                    <input className="form-input" value={editingUser.group} onChange={e => setEditingUser({...editingUser, group: e.target.value})} />
                                </div>

                                <div className="col-span-2 pt-4 flex gap-4">
                                    <button type="submit" className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all">
                                        Сохранить изменения
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <style jsx>{`
        .filter-input { @apply bg-slate-100 border-none rounded-2xl px-6 py-4 text-[11px] font-black uppercase outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700; }
        .form-label { @apply text-[8px] font-black uppercase text-slate-400 mb-2 block ml-2; }
        .form-input { @apply w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-[11px] font-bold outline-none focus:border-indigo-500 transition-all; }
      `}</style>
        </div>
    );
}