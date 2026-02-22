"use client";
import { useState } from 'react';
import {useAuth} from "@/src/features/Context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState('Loyal55@yahoo.com'); // Твой пример
    const [pass, setPass] = useState('123'); // Твой пример
    const { login } = useAuth();
    const [error, setError] = useState("Not logged in");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await login(email, pass);
        console.log(res);
        if (!res.success) setError("Не верный Email или пароль");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl w-full max-w-md border-2 border-slate-100">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2 text-slate-900">EDU.CORE</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-8">Вход в систему обучения</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email" placeholder="Email"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Пароль"
                        className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
                        value={pass} onChange={e => setPass(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                    <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs shadow-lg shadow-indigo-200 hover:scale-[1.02] transition-transform">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}