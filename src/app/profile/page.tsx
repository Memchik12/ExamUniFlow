


export default function ProfilePage()
{
    return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-white">
                👤
            </div>
            <div className="text-center md:text-left space-y-2">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-3xl font-black text-slate-800">Иван Иванов</h2>
                    <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-widest">
            Студент
          </span>
                </div>
                <p className="text-slate-500 font-medium text-lg">Класс: 11-Б (Информационные технологии)</p>
                <p className="text-slate-400">Киевский политехнический институт имени Игоря Сикорского</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Средний балл</p>
                <p className="text-2xl font-black text-indigo-600">10.5</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Посещаемость</p>
                <p className="text-2xl font-black text-emerald-500">98%</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-1">Курс</p>
                <p className="text-2xl font-black text-amber-500">1-й курс</p>
            </div>
        </div>
    </div>
    )
}