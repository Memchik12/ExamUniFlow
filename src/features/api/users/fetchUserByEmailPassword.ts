import {MOCK_API_USERS_URL} from "@/src/features/Components/config";
import {User} from "@/src/features/Components/types";


export default async function fetchUserByEmailPassword(userEmail: string, userPassword: string): Promise<User> {
    const url = `${MOCK_API_USERS_URL}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const users = await response.json();
    const found:User = users.find((u: User) => u.email === userEmail && u.password === userPassword);

    return await found;
}