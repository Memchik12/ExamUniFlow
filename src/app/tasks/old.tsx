
"use client";
import React, {useRef, useState} from 'react';
import {Status, Task} from "@/src/features/Components/types";
import {useTasks} from "@/src/features/Context/LessonContext";

export default function TasksPage() {
    const { tasks, loading, updateTask } = useTasks();
    const [activeTab, setActiveTab] = useState<Status>('pending');

    // Локальное состояние для выбранного файла (до момента отправки)
    const [selectedFiles, setSelectedFiles] = useState<Record<string, File | null>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentTasks = tasks.filter((t: Task) => t.status === activeTab);

    const handleFileChange = (taskId: string, file: File | null) => {
        setSelectedFiles(prev => ({ ...prev, [taskId]: file }));
    };

    const handleSend = (taskId: string) => {
        const file = selectedFiles[taskId];
        if (!file) {
            alert("Сначала прикрепите файл!");
            return;
        }
        updateTask(taskId, 'review');
    };

    if (loading) return <div className="p-10 text-center font-black">ЗАГРУЗКА...</div>;

    return (
        <div className="space-y-8 max-w-6xl mx-auto">

            <h1 className="text-4xl font-black text-slate-900 italic tracking-tighter">TASKS_MANAGER</h1>

            {/* Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-2xl w-fit">
                {['pending', 'review', 'completed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as Status)}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
                        }`}
                    >
                        {tab === 'pending' ? 'К выполнению' : tab === 'review' ? 'На проверке' : 'Выполненые'}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTasks.map((task) => (
                    <div key={task.id} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-slate-800">{task.title}</h3>
                            {task.status === 'completed' && (
                                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black italic">SCORE: {task.grade}</span>
                            )}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Задание от {task.teacher}:</p>
                            <p className="text-sm text-slate-700 font-medium italic">"{task.homeworkTask}"</p>
                        </div>

                        {/* ЛОГИКА ДЛЯ ВНУТРЕННОСТИ КАРТОЧКИ */}
                        {task.status === 'pending' && (
                            <div className="space-y-4">
                                <div
                                    onClick={() => document.getElementById(`file-${task.id}`)?.click()}
                                    className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                                >
                                    <input
                                        type="file"
                                        id={`file-${task.id}`}
                                        className="hidden"
                                        onChange={(e) => handleFileChange(task.id, e.target.files?.[0] || null)}
                                    />
                                    <p className="text-xs text-slate-500 font-bold">
                                        {selectedFiles[task.id] ? `✅ ${selectedFiles[task.id]?.name}` : "КЛИКНИТЕ ЧТОБЫ ВЫБРАТЬ ФАЙЛ"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleSend(task.id)}
                                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700"
                                >
                                    ОТПРАВИТЬ РАБОТУ
                                </button>
                            </div>
                        )}

                        {task.status === 'review' && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <span className="text-xl">📄</span>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-[10px] font-black text-blue-400 uppercase">Прикреплен файл:</p>
                                        <p className="text-xs font-bold text-blue-700 truncate">{task.fileName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateTask(task.id, 'pending')}
                                    className="w-full bg-red-50 text-red-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-red-100 hover:bg-red-500 hover:text-white transition-all"
                                >
                                    ОТМЕНИТЬ ОТПРАВКУ
                                </button>
                            </div>
                        )}

                        {task.status === 'completed' && (
                            <div className="flex items-center justify-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-xs font-black text-emerald-600 uppercase">ЗАДАНИЕ ПРИНЯТО И ПРОВЕРЕНО</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}