"use client";
import {useTasks} from "@/src/features/Context/LessonContext";

export default function DonePage() {
    const { tasks } = useTasks();
    const list = tasks.filter(t => t.status === 'completed');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map(task => (
                <div key={task.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-emerald-100 flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">
                        {task.grade}
                    </div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase mt-2">ПРОВЕРЕНО</p>
                </div>
            ))}
        </div>
    );
}