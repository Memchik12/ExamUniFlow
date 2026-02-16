"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext<any>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await fetch('https://698790cc8bacd1d773edbce4.mockapi.io/tasks');
            const data = await res.json();
            setTasks(data);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchTasks(); }, []);

    const updateTask = async (id: string, updates: any) => {
        const oldTask: any = tasks.find((t: any) => t.id === id);
        const fullTask = { ...oldTask, ...updates };

        await fetch(`https://698790cc8bacd1d773edbce4.mockapi.io/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullTask)
        });

        setTasks((prev: any) => prev.map((t: any) => t.id === id ? fullTask : t));
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);