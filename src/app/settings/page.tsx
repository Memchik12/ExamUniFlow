import {_Sidebar} from "@/src/widgets/partial/_Sidebar";

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <_Sidebar/>
            <div className="max-w-xl space-y-6 animate-in slide-in-from-left-4 duration-300 p-8">
                <h1 className="text-3xl font-black text-slate-900 uppercase">Настройки</h1>
                <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div>
                            <p className="font-bold text-slate-700">Push-уведомления</p>
                            <p className="text-xs text-slate-400">О новых оценках и сообщениях</p>
                        </div>
                        <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center px-1">
                            <div className="w-4 h-4 bg-white rounded-full ml-auto"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl opacity-50">
                        <div>
                            <p className="font-bold text-slate-700">Сменить пароль</p>
                            <p className="text-xs text-slate-400">Последний раз изменен 2 месяца назад</p>
                        </div>
                        <button className="text-indigo-600 text-sm font-bold">Изменить</button>
                    </div>
                    <button
                        className="w-full py-4 bg-red-50 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all opacity-5;">
                        ВЫЙТИ ИЗ АККАУНТА
                    </button>
                </div>
            </div>
        </div>
    );
}