"use client";

import { useState } from 'react';
import { MOCK_API_USERS_URL } from '../../features/LessonsComponent/config';
import { Lesson,Day, Status } from './types';
import { ScheduleTable } from '../../features/LessonsComponent/ScheduleTable';
import { HomeworkModal } from '../../features/LessonsComponent/HomeworkModal';
import {_Sidebar} from "@/src/widgets/HomeMenu/_Sidebar";

const initialData: Lesson[] = [
    {
        id: '1',
        day: 'Monday',
        slotIndex: 0,
        title: "Архитектура Next.js",
        teacher: "Алексеев",
        description: "Разбор App Router",
        homeworkTask: "Создать Sidebar",
        status: 'pending'
    },
    {
        id: '2',
        day: 'Wednesday',
        slotIndex: 2,
        title: "TypeScript Advanced",
        teacher: "Белова",
        description: "Union types & Literals",
        homeworkTask: "Типизировать дни недели",
        status: 'review'
    },
];

export default function Dashboard() {
    const [lessons, setLessons] = useState<Lesson[]>(initialData);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const handleStatusUpdate = (id: string, newStatus: Status) => {
        setLessons(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        setSelectedLesson(null);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Левая часть: Сайдбар */}
            <_Sidebar />

            {/* Правая часть: Контент */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-[1400px] mx-auto">
                    <header className="mb-8">
                        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Расписание пар</h1>
                        <p className="text-sm text-slate-500">API: {MOCK_API_USERS_URL}</p>
                    </header>

                    <ScheduleTable
                        lessons={lessons}
                        onLessonSelect={setSelectedLesson}
                    />

                    {selectedLesson && (
                        <HomeworkModal
                            lesson={selectedLesson}
                            onClose={() => setSelectedLesson(null)}
                            onStatusChange={handleStatusUpdate}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}