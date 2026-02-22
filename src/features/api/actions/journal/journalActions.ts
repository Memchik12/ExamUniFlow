'use server'


import {MOCK_API_USERS_URL} from "@/src/features/Components/config";

export async function getStudentsByGroup(course: number, group: string) {
    // В реальном API мы бы фильтровали через query-параметры
    const res = await fetch(`${MOCK_API_USERS_URL}`, { cache: 'no-store' });
    const users = await res.json();

    // Фильтруем тех, у кого роль 'student' и совпадают курс/группа
    return users.filter((u: any) =>
        u.role === 'student' &&
        u.course === course &&
        u.group === group
    );
}

export async function saveAttendanceAction(attendanceData: any) {
    // Здесь будет логика сохранения в базу данных
    console.log('Saving attendance:', attendanceData);
    return { success: true };
}