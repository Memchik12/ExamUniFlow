'use server'

import {MOCK_API_USERS_URL} from "@/src/features/Components/config";

export async function getAllUsersAction() {
    const res = await fetch(MOCK_API_USERS_URL);
    if (!res.ok) return [];
    return await res.json();
}