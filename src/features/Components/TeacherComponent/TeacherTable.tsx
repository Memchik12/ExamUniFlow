"use client";
import React from 'react';
import {Task} from "@/src/features/Components/types";

interface TeacherTableProps {
    tasks: Task[];
    onSelectTask: (task: Task) => void; // Для открытия GradeModal
    onCreateTask?: () => void;         // Для открытия CreateTaskModal
}

export const TeacherTable = ({ tasks, onSelectTask, onCreateTask }: TeacherTableProps) => {
    return (
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Список работ</h2>
                {onCreateTask && (
                    <button
                        onClick={onCreateTask}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700 transition-all"
                    >
                        + Новое задание
                    </button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-100">
                        <th className="p-6">Предмет / Тема</th>
                        <th className="p-6">Статус</th>
                        <th className="p-6">Файл студента</th>
                        <th className="p-6 text-right">Действие</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-slate-50/30 transition-colors">
                            <td className="p-6">
                                <div className="font-bold text-slate-800">{task.title}</div>
                                <div className="text-[10px] text-indigo-500 font-bold uppercase">{task.teacher}</div>
                            </td>
                            <td className="p-6">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${
                      task.status === 'review' ? 'bg-amber-100 text-amber-600' :
                          task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {task.status}
                  </span>
                            </td>
                            <td className="p-6">
                                {task.fileName ? (
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                        <span className="text-lg">📄</span> {task.fileName}
                                    </div>
                                ) : (
                                    <span className="text-slate-300 text-[10px] italic">Не отправлено</span>
                                )}
                            </td>
                            <td className="p-6 text-right">
                                {task.status === 'review' ? (
                                    <button
                                        onClick={() => onSelectTask(task)}
                                        className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 transition-all"
                                    >
                                        Оценить
                                    </button>
                                ) : task.status === 'completed' ? (
                                    <div className="font-black text-emerald-500">Балл: {task.grade}</div>
                                ) : (
                                    <span className="text-slate-300 text-[10px] font-bold uppercase">Ожидание</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};