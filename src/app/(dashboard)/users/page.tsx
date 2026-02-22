"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {getAllUsersAction} from "@/src/features/api/actions/users/userActions";
import {_Sidebar} from "@/src/widgets/partial/_Sidebar";

type SortConfig = {
    key: string;
    direction: 'asc' | 'desc';
} | null;

export default function UsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    const [filters, setFilters] = useState({
        id: '', name: '', email: '', group: '', course: '', institution: '', role: ''
    });

    useEffect(() => {
        getAllUsersAction().then((data) => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    // 1. Сначала фильтруем, потом сортируем (используем useMemo для скорости)
    const processedUsers = useMemo(() => {
        // ФИЛЬТРАЦИЯ
        let result = users.filter(user => {
            return (
                user.id.toLowerCase().includes(filters.id.toLowerCase()) &&
                user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
                (user.group || '').toLowerCase().includes(filters.group.toLowerCase()) &&
                (user.course?.toString() || '').includes(filters.course) &&
                (user.nameEducationalinstItution || '').toLowerCase().includes(filters.institution.toLowerCase()) &&
                user.role.toLowerCase().includes(filters.role.toLowerCase())
            );
        });

        // СОРТИРОВКА
        if (sortConfig !== null) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key] || '';
                const bValue = b[sortConfig.key] || '';

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [users, filters, sortConfig]);

    // Функция переключения сортировки
    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Компонент иконки сортировки
    const SortIndicator = ({ column }: { column: string }) => {
        if (sortConfig?.key !== column) return <span className="opacity-20 ml-1">⇅</span>;
        return sortConfig.direction === 'asc' ? <span className="ml-1 text-indigo-400">▲</span> : <span className="ml-1 text-indigo-400">▼</span>;
    };

    return (
        <div className="flex">
            <_Sidebar></_Sidebar>
            <div className="p-8 flex-1 bg-white min-h-screen">
                <header className="mb-8">
                    <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Users.Directory</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Панель управления доступом</p>
                </header>

                {/* ФИЛЬТРЫ (те же, что были) */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
                    <input name="id" placeholder="ID" onChange={handleFilterChange} className="filter-input" />
                    <input name="name" placeholder="ИМЯ" onChange={handleFilterChange} className="filter-input" />
                    <input name="email" placeholder="EMAIL" onChange={handleFilterChange} className="filter-input" />
                    <input name="group" placeholder="ГРУППА" onChange={handleFilterChange} className="filter-input" />
                    <input name="course" placeholder="КУРС" onChange={handleFilterChange} className="filter-input" />
                    <input name="institution" placeholder="ВУЗ" onChange={handleFilterChange} className="filter-input" />
                    <select name="role" onChange={handleFilterChange} className="filter-input appearance-none">
                        <option value="">ВСЕ РОЛИ</option>
                        <option value="student">STUDENT</option>
                        <option value="teacher">TEACHER</option>
                        <option value="admin">ADMIN</option>
                    </select>
                </div>

                {/* ТАБЛИЦА */}
                <div className="bg-white rounded-[2rem] border-2 border-slate-100 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-slate-900 text-white font-black uppercase text-[9px] tracking-widest">
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('id')}>
                                    ID <SortIndicator column="id" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('name')}>
                                    User <SortIndicator column="name" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('email')}>
                                    Email <SortIndicator column="email" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('group')}>
                                    Group <SortIndicator column="group" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('course')}>
                                    Course <SortIndicator column="course" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('nameEducationalinstItution')}>
                                    Institution <SortIndicator column="nameEducationalinstItution" />
                                </th>
                                <th className="p-5 cursor-pointer hover:bg-slate-800" onClick={() => requestSort('role')}>
                                    Role <SortIndicator column="role" />
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {processedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-5 text-[10px] font-mono text-slate-400">#{user.id.slice(-5)}</td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all shadow-sm" alt="" />
                                            <span className="font-black text-slate-800 text-xs uppercase">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-[11px] text-slate-600 font-medium">{user.email}</td>
                                    <td className="p-5">
                                        <span className="bg-slate-100 px-3 py-1 rounded-lg text-[10px] font-black">{user.group || '—'}</span>
                                    </td>
                                    <td className="p-5 font-black text-indigo-600 text-[11px]">{user.course || '—'}</td>
                                    <td className="p-5 text-[10px] text-slate-500 uppercase font-bold leading-tight max-w-[150px] truncate">
                                        {user.nameEducationalinstItution}
                                    </td>
                                    <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${
                            user.role === 'admin' ? 'bg-red-50 border-red-200 text-red-600' :
                                user.role === 'teacher' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                                    'bg-indigo-50 border-indigo-200 text-indigo-600'
                        }`}>
                          {user.role}
                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <style jsx>{`
            .filter-input {
              @apply w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-[10px] font-black uppercase text-slate-600 focus:border-indigo-500 focus:ring-0 outline-none transition-all placeholder:text-slate-300;
            }
          `}</style>
            </div>
        </div>
    );
}