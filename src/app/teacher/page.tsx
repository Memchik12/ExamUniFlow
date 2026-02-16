"use client";
import React, { useState } from 'react';
import {useTasks} from "@/src/features/Context/LessonContext";
import {GradeModal} from "@/src/features/Components/TasksComponent/GradeModal";

export default function TeacherTablePage() {
    // const { tasks, loading, updateTask } = useTasks();
    // const [selectedTask, setSelectedTask] = useState<any>(null);
    //
    // // Показываем только те, что на проверке
    // const reviewTasks = tasks.filter(t => t.status === 'review');
    //
    // if (loading) return <div>Загрузка таблицы...</div>;
    //
    // return (
    //     <div className="space-y-8">
    //         <h1 className="text-3xl font-black uppercase tracking-tighter">Журнал проверки</h1>
    //
    //         <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
    //             <table className="w-full text-left">
    //                 <thead className="bg-slate-50 border-b border-slate-100">
    //                 <tr>
    //                     <th className="p-6 text-[10px] font-black uppercase text-slate-400">Студент / Предмет</th>
    //                     <th className="p-6 text-[10px] font-black uppercase text-slate-400">Файл</th>
    //                     <th className="p-6 text-[10px] font-black uppercase text-slate-400">Дата сдачи</th>
    //                     <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Действие</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody className="divide-y divide-slate-50">
    //                 {reviewTasks.map(task => (
    //                     <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
    //                         <td className="p-6">
    //                             <div className="font-bold text-slate-800">{task.title}</div>
    //                             <div className="text-[10px] text-slate-400 uppercase tracking-widest">{task.teacher}</div>
    //                         </td>
    //                         <td className="p-6">
    //                             <button className="text-indigo-600 font-bold text-xs flex items-center gap-2">
    //                                 📁 {task.fileName}
    //                             </button>
    //                         </td>
    //                         <td className="p-6 text-xs text-slate-500 font-medium">Сегодня, 14:20</td>
    //                         <td className="p-6 text-right">
    //                             <button
    //                                 onClick={() => setSelectedTask(task)}
    //                                 className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-500 transition-all"
    //                             >
    //                                 Поставить балл
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //                 </tbody>
    //             </table>
    //             {reviewTasks.length === 0 && <div className="p-20 text-center text-slate-400 italic">Нет работ на проверку</div>}
    //         </div>
    //
    //         {selectedTask && (
    //             <GradeModal
    //                 task={selectedTask}
    //                 onClose={() => setSelectedTask(null)}
    //                 onGrade={(grade) => {
    //                     updateTask(selectedTask.id, { status: 'completed', grade });
    //                     setSelectedTask(null);
    //                 }}
    //             />
    //         )}
    //     </div>
    // );
    return null;
}