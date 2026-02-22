import {MOCK_API_USERS_URL} from "@/src/features/Components/config";
import {User} from "@/src/features/Components/types";


export default async function fetchUserById(userId: string): Promise<User> {
    const url = `${MOCK_API_USERS_URL}/${userId}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}