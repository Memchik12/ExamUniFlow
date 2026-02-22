'use server'
// Получаем только те задачи, которые имеют статус 'review'
import {MOCK_API_TASKS_URL} from "@/src/features/Components/config";

export async function getTasksForReviewAction() {
    const res = await fetch(MOCK_API_TASKS_URL, { cache: 'no-store' });
    const tasks = await res.json();
    return tasks.filter((t: any) => t.status === 'review');
}

// Обновляем задачу через PATCH
export async function updateTaskReviewAction(taskId: string, updateData: any) {
    const res = await fetch(`${MOCK_API_TASKS_URL}/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
    });

    if (!res.ok) throw new Error('Ошибка при обновлении задачи');
    return await res.json();
}