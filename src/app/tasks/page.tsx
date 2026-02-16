"use client";
import React, { useState } from 'react';
import {useTasks} from "@/src/features/Context/LessonContext";
import {SubmitModal} from "@/src/features/Components/LessonsComponent/SubmitModal";

export default function PendingPage() {
    const { tasks, updateTask, loading } = useTasks();
    const [selected, setSelected] = useState<any>(null);

    const list = tasks.filter(t => t.status === 'pending');

    if (loading) return <div className="p-10 font-black italic">SYNCING_TASKS...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map(task => (
                <div key={task.id} onClick={() => setSelected(task)} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-indigo-500 cursor-pointer transition-all shadow-sm">
                    <p className="text-[10px] font-black text-indigo-500 uppercase mb-2">{task.teacher}</p>
                    <h3 className="text-xl font-bold mb-4">{task.title}</h3>
                    <div className="bg-slate-50 p-4 rounded-xl text-[11px] text-slate-500 italic leading-relaxed">
                        "{task.homeworkTask}"
                    </div>
                </div>
            ))}

            {selected && (
                <SubmitModal
                    task={selected}
                    onClose={() => setSelected(null)}
                    onSubmit={(file: string) => {
                        updateTask(selected.id, { status: 'review', fileName: file });
                        setSelected(null);
                    }}
                />
            )}
        </div>
    );
}