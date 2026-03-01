'use server'

import {MOCK_API_USERS_URL} from "@/src/features/Components/config";
import {User} from "@/src/features/Components/types";

export async function getAllUsersAction() {
    const res = await fetch(MOCK_API_USERS_URL);
    if (!res.ok) return [];
    return await res.json();
}

export async function createUserAction(formData: User) {
    // 1. Получаем всех, чтобы вычислить последний ID
    const res = await fetch(MOCK_API_USERS_URL);
    const users = await res.json();

    // Находим максимальный числовой ID и прибавляем 1
    const lastId = users.reduce((max: number, user: any) => {
        const userId = parseInt(user.id);
        return userId > max ? userId : max;
    }, 0);

    const newUser = {
        ...formData,
        id: (lastId + 1).toString(), // ID на 1 больше последнего
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`, // Авто-аватар
        createdAt: new Date().toISOString()
    };

    // 2. Отправляем в API
    const saveRes = await fetch(MOCK_API_USERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });

    if (!saveRes.ok) throw new Error('Ошибка при создании');

    return await saveRes.json();
}
export async function updateUserAction(id: string, data: any) {
    const res = await fetch(`${MOCK_API_USERS_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Ошибка обновления');
    return await res.json();
}

export async function deleteUserAction(id: string) {
    const res = await fetch(`${MOCK_API_USERS_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Ошибка удаления');
    return true;
}