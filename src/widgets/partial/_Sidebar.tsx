"use client"
import React, {use} from 'react';
import { SIDEBAR_MENU } from '../../widgets/partial/SIDEBAR_config';
import {useAuth} from "@/src/features/Context/AuthContext";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {getRoleLevel} from "@/src/features/RuleRestrictions/permissions";

export const _Sidebar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    if (!user) return null;
    const userLevel = getRoleLevel(user.role);

    // Фильтруем пункты меню на основе уровня доступа пользователя
    const filteredMenu = SIDEBAR_MENU.filter(item => userLevel >= item.minRole);

    return (
        <aside className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col text-white shadow-xl">
            {/* КАРТОЧКА ПОЛЬЗОВАТЕЛЯ */}
            <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 m-6 mb-2">
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={user.avatar || 'https://via.placeholder.com/40'}
                        className="w-10 h-10 rounded-full border-2 border-indigo-500/50"
                        alt="avatar"
                    />
                    <div className="overflow-hidden">
                        <p className="text-[10px] font-black truncate text-white">{user.name}</p>
                        <p className="text-[8px] text-slate-500 uppercase font-bold truncate">
                            {user.nameEducationalinstItution || 'West High School'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full py-2 bg-slate-700 hover:bg-red-500/10 hover:text-red-400 transition-colors rounded-xl text-[8px] font-black uppercase border border-slate-600"
                >
                    Выйти из системы
                </button>
            </div>

            {/* КОНТЕНТ САЙДБАРА */}
            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="p-6 pb-2">
                    <h2 className="text-xl font-black italic text-indigo-400 tracking-tighter">EDU.CORE</h2>
                    <div className="mt-6 pt-4 border-t border-slate-800">
                        <h2 className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase">Study.Flow</h2>
                    </div>
                </div>

                {/* НАВИГАЦИЯ */}
                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto custom-scrollbar">
                    {filteredMenu.map((item) => {
                        const isActive = pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center space-x-3 p-3 rounded-2xl transition-all group ${
                                    isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                                        : 'hover:bg-slate-800 text-slate-400'
                                }`}
                            >
                <span className={`text-lg ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                  {item.icon}
                </span>
                                <span className={`text-[11px] font-black uppercase tracking-tight ${isActive ? 'text-white' : 'group-hover:text-indigo-300'}`}>
                  {item.label}
                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ФУТЕР */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex justify-between items-center opacity-30 group hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-black text-slate-500 uppercase">Build_Stable</span>
                        <span className="text-[8px] font-black text-indigo-500">v 1.0.2-alpha</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};