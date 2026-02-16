"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {_Sidebar} from "@/src/widgets/partial/_Sidebar";

export default function TasksLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navButtons = [
        { label: 'К выполнению', href: '/tasks' },
        { label: 'На проверке', href: '/tasks/consideration' },
        { label: 'Выполненные', href: '/tasks/done' },
    ];

    return (
        <div>
            <div className="flex">
                <_Sidebar />
                <div className="p-8 overflow-y-auto">

                    <header className="flex flex-col gap-6">
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">Education_Board</h1>

                        {/* Навигация кнопками */}
                        <div className="flex bg-slate-200/50 p-1.5 rounded-2xl w-fit border border-slate-200">
                            {navButtons.map((btn) => (
                                <Link key={btn.href} href={btn.href}>
                                    <div className={`px-8 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                        pathname === btn.href
                                            ? 'bg-white text-indigo-600 shadow-md'
                                            : 'text-slate-400 hover:text-slate-600'
                                    }`}>
                                        {btn.label.toUpperCase()}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </header>
                    <main>{children}</main>

                </div>
            </div>

        </div>
    );
}