"use client";

import React, { useState } from 'react';
import {useLessons} from "@/src/features/LessonsComponent/Context/LessonContext";
import {Lesson, Status} from "@/src/features/LessonsComponent/types";


export default function TasksPage() {
    // Получаем данные из контекста (теперь без ошибок типизации)
    const { lessons } = useLessons();

    // Состояние активной вкладки
    const [activeTab, setActiveTab] = useState<Status>('pending');

    // Фильтруем уроки только для первой вкладки
    const pendingLessons = lessons.filter((l: Lesson) => l.status === 'pending');

    // Конфигурация кнопок
    const tabs = [
        { id: 'pending' as Status, label: 'К выполнению' },
        { id: 'review' as Status, label: 'На проверке' },
        { id: 'completed' as Status, label: 'Выполненные' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                    Задания
                </h1>
                <p className="text-slate-500 text-sm mt-1">Управляйте своими учебными задачами</p>
            </header>

            {/* Переключатель вкладок */}
            <div className="flex p-1 bg-slate-200/60 w-fit rounded-2xl border border-slate-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Отрисовка контента в зависимости от вкладки */}
            <div className="min-h-[400px]">
                {activeTab === 'pending' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingLessons.length > 0 ? (
                            pendingLessons.map((lesson: Lesson) => (
                                <div
                                    key={lesson.id}
                                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-colors group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">
                      {lesson.teacher}
                    </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                        {lesson.title}
                                    </h3>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Изучали:</p>
                                            <p className="text-xs text-slate-600 line-clamp-2">{lesson.description}</p>
                                        </div>

                                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                                            <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Домашнее задание:</p>
                                            <p className="text-xs text-amber-900 font-medium italic">
                                                {lesson.homeworkTask}
                                            </p>
                                        </div>
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-all active:scale-95">
                                        ОТКРЫТЬ УРОК
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                                <span className="text-4xl mb-4">🎉</span>
                                <p className="font-medium">Все задания выполнены!</p>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Пустые вкладки "На проверке" и "Выполненные" */
                    <div className="w-full h-64 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-400 italic">
                        Здесь пока ничего нет
                    </div>
                )}
            </div>
        </div>
    );
}