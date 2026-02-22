"use client";
import React, { useState, useEffect } from 'react';
import { getTasksForReviewAction, updateTaskReviewAction } from '@/src/features/api/actions/review/reviewActions';
import {_Sidebar} from "@/src/widgets/partial/_Sidebar";

export default function ReviewTablePage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Состояния для формы оценки
    const [grade, setGrade] = useState('10');
    const [comment, setComment] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasksForReviewAction();
        setTasks(data);
        setLoading(false);
    };

    const handleAction = async (isApproved: boolean) => {
        if (!selectedTask) return;

        const updateData = isApproved
            ? { status: 'completed', grade: Number(grade), teacherComment: comment }
            : { status: 'pending', teacherComment: comment };

        try {
            await updateTaskReviewAction(selectedTask.id, updateData);
            setTasks(prev => prev.filter(t => t.id !== selectedTask.id));
            setSelectedTask(null);
            setComment('');
        } catch (e) {
            alert("Ошибка PATCH-запроса");
        }
    };

    return (
        <div className="flex">
            <_Sidebar></_Sidebar>
            <div className="p-8 flex flex-col h-screen bg-white">
                <header className="mb-8 shrink-0">
                    <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">Review.Queue</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Очередь проверки заданий</p>
                </header>

                <div className="flex gap-8 flex-1 overflow-hidden">
                    {/* ЛЕВАЯ ЧАСТЬ: Таблица */}
                    <div className="flex-1 bg-white rounded-[2rem] border-2 border-slate-100 shadow-xl overflow-hidden flex flex-col">
                        <div className="overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 z-10">
                                <tr className="bg-slate-900 text-white font-black uppercase text-[9px] tracking-widest">
                                    <th className="p-5">Студент</th>
                                    <th className="p-5">Задание</th>
                                    <th className="p-5 text-center">Файл</th>
                                    <th className="p-5 text-right">Действие</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {tasks.map((task) => (
                                    <tr
                                        key={task.id}
                                        onClick={() => { setSelectedTask(task); setGrade('10'); }}
                                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedTask?.id === task.id ? 'bg-indigo-50/50' : ''}`}
                                    >
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                                                    <img src={task.studentAvatar} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-black text-slate-800 text-[10px] uppercase truncate max-w-[120px]">{task.studentName || 'Student'}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <p className="font-bold text-slate-700 text-xs truncate max-w-[200px]">{task.title}</p>
                                            <p className="text-[9px] text-slate-400 uppercase font-black">ID: {task.id.slice(-5)}</p>
                                        </td>
                                        <td className="p-5 text-center">
                          <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[9px] font-mono">
                            {task.fileName?.split('.').pop() || 'txt'}
                          </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800">Проверить</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {tasks.length === 0 && !loading && (
                                <div className="p-20 text-center text-slate-300 font-black uppercase text-xs">Очередь пуста</div>
                            )}
                        </div>
                    </div>

                    {/* ПРАВАЯ ЧАСТЬ: Панель проверки (Появляется при выборе) */}
                    <div className={`w-96 transition-all duration-300 ${selectedTask ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'}`}>
                        {selectedTask && (
                            <div className="bg-slate-900 rounded-[2.5rem] h-full p-8 text-white flex flex-col shadow-2xl shadow-indigo-500/20">
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                    <span className="bg-indigo-500 text-[8px] font-black px-2 py-1 rounded-md uppercase">Проверка работы</span>
                                    <h2 className="text-xl font-black uppercase leading-tight mt-4 mb-2">{selectedTask.title}</h2>
                                    <p className="text-[10px] text-slate-400 font-medium mb-6 italic">«{selectedTask.homeworkTask}»</p>

                                    <hr className="border-slate-800 mb-6" />

                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[8px] font-black uppercase text-slate-500 block mb-2">Оценка (1-12)</label>
                                            <input
                                                type="number" min="1" max="12" value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-2xl font-black text-center text-indigo-400 outline-none focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[8px] font-black uppercase text-slate-500 block mb-2">Ваш комментарий</label>
                                            <textarea
                                                placeholder="Напишите фидбек..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-[11px] h-40 resize-none outline-none focus:border-indigo-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 space-y-3 shrink-0">
                                    <button
                                        onClick={() => handleAction(true)}
                                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                                    >
                                        Принять работу
                                    </button>
                                    <button
                                        onClick={() => handleAction(false)}
                                        className="w-full py-4 bg-transparent border-2 border-slate-800 hover:border-rose-500 hover:text-rose-500 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                                    >
                                        На доработку
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}