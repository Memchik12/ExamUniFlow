"use client";
import React from 'react';
import {useTasks} from "@/src/features/Context/LessonContext";

export default function ConsiderationPage() {
    const { tasks, updateTask, loading } = useTasks();

    // Берем только те задачи, которые имеют статус "review"
    const reviewList = tasks.filter(t => t.status === 'review');

    if (loading) return <div className="p-10 font-black italic animate-pulse">SYNCING_REVIEW_LIST...</div>;

    const handleCancel = async (task: any) => {
        // Подтверждение, чтобы не нажать случайно
        if (confirm("Вы точно хотите отменить отправку и вернуть задание в 'К выполнению'?")) {
            await updateTask(task.id, {
                status: 'pending',
                fileName: '' // Очищаем файл, так как мы "забираем" работу
            });
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black uppercase tracking-tighter">На проверке</h2>
                <span className="bg-amber-100 text-amber-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">
          Ожидают: {reviewList.length}
        </span>
            </div>

            {reviewList.length === 0 ? (
                <div className="p-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400 italic">
                    Пока нет работ на проверке
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviewList.map(task => (
                        <div key={task.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-amber-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-[10px] font-black text-indigo-500 uppercase">{task.teacher}</p>
                                    <span className="bg-amber-400 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase">Reviewing</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-4">{task.title}</h3>

                                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                                    <span className="text-lg">📄</span>
                                    <span className="text-xs font-bold text-slate-600 truncate">{task.fileName}</span>
                                </div>
                            </div>

                            {/* ТА САМАЯ КНОПКА ОТМЕНЫ */}
                            <button
                                onClick={() => handleCancel(task)}
                                className="w-full py-3 border-2 border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase hover:border-red-200 hover:text-red-500 transition-all group"
                            >
                                <span className="group-hover:hidden italic">Отправлено</span>
                                <span className="hidden group-hover:block">Отменить отправку</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}