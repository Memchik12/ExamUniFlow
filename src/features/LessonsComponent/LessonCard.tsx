import React from 'react';

interface LessonProps {
    title: string;
    teacher: string;
    description: string;
    homework: string;
}

const LessonCard = ({ title, teacher, description, homework }: LessonProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{title}</h3>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Урок
          </span>
                </div>

                <p className="text-sm font-medium text-slate-500 mb-4">
                    Преподаватель: <span className="text-slate-900">{teacher}</span>
                </p>

                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Что изучали:</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                    <h4 className="text-sm font-semibold text-amber-800 mb-1 flex items-center">
                        📝 Домашнее задание
                    </h4>
                    <p className="text-amber-900 text-sm italic">{homework}</p>
                </div>
            </div>
        </div>
    );
};

export default LessonCard;