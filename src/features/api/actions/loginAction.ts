"use server"
import {MOCK_API_USERS_URL} from "@/src/features/Components/config";
import {User} from "@/src/features/Components/types";
import {cookies} from "next/headers";



export async function loginAction(email: string, pass: string) : Promise<User> {

    // Сервер делает запрос к API
    const res = await fetch(`${MOCK_API_USERS_URL}`);
    console.log(res);
    if (!res.ok)  {
        return undefined;
    };

    const users = await res.json();
    console.log(users);

    // Проверяем пользователя здесь же, на сервере
    const foundUser = users.find((u: User) => u.email === email && u.password === pass);
    console.log("foundUser - " + foundUser);
    if (foundUser) {
        const cookieStore = await cookies(); // В Next.js 15 cookies() — это Promise
        cookieStore.set('session', foundUser.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        // Возвращаем только данные пользователя, без лишних паролей всего списка
        return  foundUser ;
    }
    return null;

}

