import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="min-h-[85vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                {/* Большая цифра с акцентом */}
                <h1 className="text-[120px] font-black italic leading-none tracking-tighter text-slate-100 relative">
                    404
                    <span className="absolute inset-0 flex items-center justify-center text-slate-900 text-4xl mt-4">
            ERROR
          </span>
                </h1>

                <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl -mt-4 relative z-10">
                    <h2 className="text-2xl font-black uppercase mb-4 text-slate-800">Страница потерялась</h2>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                        Похоже, этот роут был удален или никогда не существовал.
                        Возможно, стоит вернуться к списку заданий?
                    </p>

                    <Link href="/profile">
                        <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all">
                            Вернуться в систему
                        </button>
                    </Link>
                </div>

                <p className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    System_Status: Route_Not_Resolved
                </p>
            </div>
        </div>
    );
}