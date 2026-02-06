import React, { useRef, useState } from 'react';
import { Lesson, Status } from '../../app/lessons/types';
import { DAYS, SCHEDULE_TIMES } from './config';

interface Props {
    lesson: Lesson;
    onClose: () => void;
    onStatusChange: (id: string, status: Status) => void;
}

export const HomeworkModal = ({ lesson, onClose, onStatusChange }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const isPending = lesson.status === 'pending';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-6">
                    <header className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase">
                                {DAYS[lesson.dayIndex]} • {SCHEDULE_TIMES[lesson.slotIndex].label}
                            </p>
                            <h2 className="text-xl font-bold">{lesson.title}</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                    </header>

                    <div className="space-y-4 text-sm mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg text-gray-600 italic">
                            {lesson.description}
                        </div>
                        <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg text-amber-900">
                            <span className="font-bold block text-[10px] uppercase mb-1">Задание:</span>
                            {lesson.homeworkTask}
                        </div>
                    </div>

                    {isPending ? (
                        <div className="space-y-3">
                            <input type="file" className="hidden" ref={fileRef} onChange={(e) => setFile(e.target.files?.[0] || null)} />
                            <div
                                onClick={() => fileRef.current?.click()}
                                className="border-2 border-dashed border-gray-200 p-4 rounded-xl text-center cursor-pointer hover:bg-gray-50"
                            >
                                {file ? `📎 ${file.name}` : "Прикрепить файл задания"}
                            </div>
                            <input type="text" placeholder="Комментарий преподавателю" className="w-full border p-3 rounded-xl text-sm" />
                            <button
                                onClick={() => onStatusChange(lesson.id, 'review')}
                                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700"
                            >
                                Отправить на проверку
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="bg-blue-600 text-white p-4 rounded-xl text-center font-bold">
                                🚀 Статус: На проверке
                            </div>
                            <button
                                onClick={() => onStatusChange(lesson.id, 'pending')}
                                className="w-full bg-white text-red-500 border border-red-200 py-3 rounded-xl text-sm font-semibold hover:bg-red-50"
                            >
                                Отменить отправку
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};