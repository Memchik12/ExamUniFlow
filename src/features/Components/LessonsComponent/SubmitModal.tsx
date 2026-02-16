"use client";
import React, { useState } from 'react';

export const SubmitModal = ({ task, onClose, onSubmit }: any) => {
    const [comment, setComment] = useState('');
    const [fileName, setFileName] = useState('');

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl">
                <h2 className="text-2xl font-black uppercase mb-1">Сдача работы</h2>
                <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">{task.title}</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Ваш комментарий</label>
                        <textarea
                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl h-32 outline-none focus:border-indigo-500 transition-all text-sm"
                            placeholder="Опишите детали выполнения..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="relative group border-2 border-dashed border-slate-200 p-8 rounded-3xl hover:border-indigo-300 transition-all text-center">
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                        />
                        <div className="text-xs font-bold text-slate-500">
                            {fileName ? `✅ ${fileName}` : "КЛИКНИТЕ ИЛИ ПЕРЕТАЩИТЕ ФАЙЛ"}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button onClick={onClose} className="flex-1 font-black text-slate-400 text-[10px] uppercase">Отмена</button>
                        <button
                            disabled={!fileName}
                            onClick={() => onSubmit(fileName, comment)}
                            className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-indigo-200 disabled:opacity-30"
                        >
                            Отправить на проверку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};