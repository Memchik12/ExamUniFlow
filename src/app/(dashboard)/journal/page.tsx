"use client";
import React, { useState, useEffect } from 'react';
import {getStudentsByGroup} from "@/src/features/api/actions/journal/journalActions";
import {User} from "@/src/features/Components/types";
import {_Sidebar} from "@/src/widgets/partial/_Sidebar";


const GROUPS = ['A', 'B', 'C'];
const COURSES = [1, 2, 3, 4];

export default function JournalPage() {
    const [course, setCourse] = useState(1);
    const [group, setGroup] = useState('A');
    const [students, setStudents] = useState<User[]>([]);
    const [attendance, setAttendance] = useState<Record<string, string>>({});

    useEffect(() => {
        getStudentsByGroup(course, group).then(setStudents);
    }, [course, group]);


    const toggleStatus = (studentId: string, status: 'present' | 'absent' | 'online') => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };
    return (
        <div className="flex">
            <_Sidebar></_Sidebar>

            <div className="p-8 max-w-5xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Journal.Control</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Управление посещаемостью</p>
                    </div>

                    {/* ФИЛЬТРЫ */}
                    <div className="flex gap-4">
                        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                            {COURSES.map(c => (
                                <button
                                    key={c} onClick={() => setCourse(c)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${course === c ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                                >
                                    {c} КУРС
                                </button>
                            ))}
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                            {GROUPS.map(g => (
                                <button
                                    key={g} onClick={() => setGroup(g)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${group === g ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                                >
                                    ГРУППА {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* СПИСОК СТУДЕНТОВ */}
                <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Студент</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Статус присутствия</span>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {students.length > 0 ? students.map((student) => (
                            <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <img src={student.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-md border-2 border-white" alt="" />
                                    <div>
                                        <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{student.name}</p>
                                        <p className="text-[9px] font-bold text-indigo-500 uppercase">ID: {student.id.slice(0,8)}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {[
                                        { id: 'present', label: 'Был', color: 'bg-emerald-500', icon: '✓' },
                                        { id: 'online', label: 'Онлайн', color: 'bg-indigo-500', icon: '🌐' },
                                        { id: 'absent', label: 'Нет', color: 'bg-rose-500', icon: '✕' }
                                    ].map((btn) => (
                                        <button
                                            key={btn.id}
                                            onClick={() => toggleStatus(student.id, btn.id as any)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all ${
                                                attendance[student.id] === btn.id
                                                    ? `${btn.color} border-transparent text-white scale-105 shadow-lg shadow-${btn.id === 'present' ? 'emerald' : btn.id === 'online' ? 'indigo' : 'rose'}-200`
                                                    : 'border-slate-100 text-slate-400 hover:border-slate-200'
                                            }`}
                                        >
                                            <span className="text-xs">{btn.icon}</span>
                                            <span className="text-[9px] font-black uppercase tracking-tighter">{btn.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center">
                                <p className="text-slate-300 font-black uppercase text-xs tracking-[0.3em]">No_Students_Found</p>
                            </div>
                        )}
                    </div>
                </div>

                <button className="mt-8 w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all active:scale-95">
                    Сохранить журнал за {new Date().toLocaleDateString()}
                </button>
            </div>
        </div>
    );
}