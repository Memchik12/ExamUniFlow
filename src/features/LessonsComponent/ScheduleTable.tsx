import React from 'react';
import { DAYS, SCHEDULE_TIMES } from './config';
import { Lesson } from '../../app/lessons/types';

interface Props {
    lessons: Lesson[];
    onLessonSelect: (lesson: Lesson) => void;
}

export const ScheduleTable = ({ lessons, onLessonSelect }: Props) => {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full border-collapse min-w-[1100px]">
                <thead>
                <tr className="bg-slate-50">
                    <th className="p-4 border-b border-r text-slate-400 text-[10px] uppercase font-bold w-32">Время</th>
                    {DAYS.map(day => (
                        <th key={day} className="p-4 border-b border-r last:border-r-0 font-bold text-slate-700 text-sm">
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {SCHEDULE_TIMES.map((slot, sIdx) => (
                    <tr key={sIdx}>
                        <td className="p-3 border-b border-r bg-slate-50/50 text-center">
                            <div className="text-xs font-bold text-indigo-600">{slot.label}</div>
                            <div className="text-[10px] text-slate-400">{slot.time}</div>
                        </td>
                        {DAYS.map((dayName) => {
                            // Ищем урок по названию дня и индексу слота
                            const lesson = lessons.find(l => l.day === dayName && l.slotIndex === sIdx);
                            return (
                                <td key={dayName} className="p-2 border-b border-r last:border-r-0 h-28 w-[13.5%]">
                                    {lesson && (
                                        <button
                                            onClick={() => onLessonSelect(lesson)}
                                            className={`w-full h-full text-left p-3 rounded-xl border transition-all hover:scale-[1.02] ${
                                                lesson.status === 'review'
                                                    ? 'bg-blue-50 border-blue-200'
                                                    : 'bg-white border-slate-200 shadow-sm hover:border-indigo-400'
                                            }`}
                                        >
                                            <h4 className="text-xs font-bold text-slate-800 leading-tight mb-1">{lesson.title}</h4>
                                            <p className="text-[10px] text-slate-500 mb-2">{lesson.teacher}</p>
                                            {lesson.status === 'review' && (
                                                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded-full">Проверка</span>
                                            )}
                                        </button>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};