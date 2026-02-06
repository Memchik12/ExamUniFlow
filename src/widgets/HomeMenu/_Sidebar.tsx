import React from 'react';
import { SIDEBAR_MENU } from '../../features/LessonsComponent/config';

export const _Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 h-screen sticky top-0 flex flex-col text-white shadow-xl">
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
        </aside>
    );
};