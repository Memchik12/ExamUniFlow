"use client";
import React from 'react';
import {Task} from "@/src/features/Components/types";

interface Props {
    task: Task;
    onClose: () => void;
    onGrade: (grade: number) => void;
}
// оченка ДЗ
export const GradeModal = ({ task, onClose, onGrade }: Props) => {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
                <h2 className="text-2xl font-black italic uppercase mb-2">Оценить работу</h2>
                <p className="text-slate-500 text-xs font-bold mb-6">ФАЙЛ: {task.fileName}</p>

                <div className="grid grid-cols-4 gap-3 mb-8">
                    {[...Array(12)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => onGrade(i + 1)}
                            className="py-3 bg-slate-50 border border-slate-200 rounded-xl font-black hover:bg-indigo-600 hover:text-white transition-all text-sm"
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button onClick={onClose} className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest">Отмена</button>
            </div>
        </div>
    );
};