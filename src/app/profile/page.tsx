"use client"

import {_Sidebar} from "@/src/widgets/partial/_Sidebar";
import {useAuth} from "@/src/features/Context/AuthContext";
import React from "react";


export default function ProfilePage()
{
    const { user, logout } = useAuth(); // Берем из правильного контекста
    if (!user) return null;
    return (
        <form className="flex min-h-screen ">
            <_Sidebar/>
            <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
                <div
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
                    <div>
                        <img src={user.avatar} className="w-20 h-20 rounded-full" alt="avatar" />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
                            <span
                                className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-widest">
                            {user.role}
                        </span>
                        </div>
                        <p className="text-slate-500 font-medium text-lg">{user.class}</p>
                        <p className="text-slate-400">{user.nameEducationalinstItution}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">Средний балл</p>
                        <p className="text-2xl font-black text-indigo-600">10.5</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">Посещаемость</p>
                        <p className="text-2xl font-black text-emerald-500">98%</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-slate-400 text-xs font-bold uppercase mb-1">Курс</p>
                        <p className="text-2xl font-black text-amber-500">{user.course}</p>
                    </div>
                </div>
            </div>
        </form>
    )
}