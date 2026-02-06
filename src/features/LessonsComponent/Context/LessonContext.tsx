"use client";
import React, { createContext, useContext, useState } from 'react';
import { Lesson, Status } from '../types';

const initialLessons: Lesson[] = [
    { id: '1', day: 'Monday', slotIndex: 0, title: "Next.js", teacher: "Алексеев", description: "...", homeworkTask: "Сделать роутинг", status: 'pending' },
    { id: '2', day: 'Tuesday', slotIndex: 1, title: "UI/UX Design", teacher: "Волкова", description: "...", homeworkTask: "Макет дашборда", status: 'review' },
    { id: '3', day: 'Wednesday', slotIndex: 2, title: "Algorithms", teacher: "Петров", description: "...", homeworkTask: "Сортировка", status: 'completed', grade: 11 },
];

const LessonContext = createContext<any>(null);

export const LessonProvider = ({ children }: { children: React.ReactNode }) => {
    const [lessons, setLessons] = useState(initialLessons);

    const updateStatus = (id: string, newStatus: Status) => {
        setLessons(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    };

    return (
        <LessonContext.Provider value={{ lessons, updateStatus }}>
            {children}
        </LessonContext.Provider>
    );
};

export const useLessons = () => useContext(LessonContext);