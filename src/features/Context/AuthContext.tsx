"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {MOCK_API_USERS_URL} from "@/src/features/Components/config";


const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem('edu_user');
        if (saved) setUser(JSON.parse(saved));
        setIsAuthLoading(false);
    }, []);

    const login = async (email: string, pass: string) => {
        const res = await fetch(MOCK_API_USERS_URL);
        const users = await res.json();
        const found = users.find((u: any) => u.email === email && u.password === pass);

        if (found) {
            setUser(found);
            localStorage.setItem('edu_user', JSON.stringify(found));
            router.push('/tasks');
            return { success: true };
        }
        return { success: false };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('edu_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);