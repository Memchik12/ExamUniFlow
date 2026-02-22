"use client";

export default function LoadingPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            {/* Анимированный спиннер в стиле проекта */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>

            <div className="mt-8 text-center">

                <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 animate-pulse">
                    Syncing_Data...
                </h2>
                <p className="text-[10px] font-black text-slate-400 uppercase mt-2 tracking-widest">
                    Пожалуйста, подождите
                </p>
            </div>
        </div>
    );
}