"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {User} from "@/src/features/Components/types";
import {loginAction} from "@/src/features/api/actions/loginAction";
import {logoutAction} from "@/src/features/api/actions/logoutAction";

interface AuthContextType {
    user: User | null;
    login: (email: string, pass: string) => Promise<{ success: boolean }>;
    logout: () => void;
    isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem('edu_user');
        if (saved) setUser(JSON.parse(saved));
        setIsAuthLoading(false);
    }, []);

    const login = async (email: string, pass: string) => {
        //console.log("login", email, pass);
        // const found : UserResponse = await loginAction(email, pass);
        // console.log("found", found);
        //
        // if (found.status === "success" ) {
        //     console.log("setUser", found);
        //     setUser(found.data);
        //     localStorage.setItem('edu_user', JSON.stringify(found));
        //     router.push('/tasks');
        //     return true;
        // }


        const found = await loginAction(email, pass);
        console.log(found);
        if (found) {
            setUser(found);
            console.log(found);
            localStorage.setItem('edu_user', JSON.stringify(found));
            router.push('/tasks');
            return { success: true };
        }
        return { success: false };

        //return false;
    };

    const logout = async () => {
        setUser(null);
        logoutAction()
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