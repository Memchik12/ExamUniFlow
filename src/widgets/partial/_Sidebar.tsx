"use client"
import React from 'react';
import { SIDEBAR_MENU } from '../../features/Components/config';
import {useAuth} from "@/src/features/Context/AuthContext";

export const _Sidebar = () => {
    const { user, logout } = useAuth(); // Берем из правильного контекста

    if (!user) return null;
    return (
        <aside className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col text-white shadow-xl">
            <div className="bg-slate-800 p-4 rounded-3xl border border-slate-700 m-8">
                <div className="flex items-center gap-3 mb-4">
                    <img src={user.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                    <div className="overflow-hidden">
                        <p className="text-[10px] font-black truncate">{user.name}</p>
                        <p className="text-[8px] text-slate-500 uppercase">{user.nameEducationalinstItution}</p>
                    </div>
                </div>
                <button onClick={logout} className="w-full py-2 bg-slate-700 rounded-xl text-[8px] font-black uppercase">Выход</button>
            </div>
            <div className="p-6 bg-slate-900 text-white h-screen flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-black italic text-indigo-400 mb-10">EDU.CORE</h2>
                    {/* Ссылки на страницы здесь */}
                    <div className="p-6 border-b border-slate-800">
                        <h2 className="text-xl font-black tracking-tighter text-indigo-400">STUDY.FLOW</h2>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        {SIDEBAR_MENU.map((item) => (
                            <a
                                key={item.path}
                                href={item.path} // В реальном Next.js здесь будет <Link href={item.path}>
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium group-hover:text-indigo-300">{item.label}</span>
                            </a>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                        v 1.0.2-alpha
                    </div>
                </div>


            </div>

        </aside>
    );
};