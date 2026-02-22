export enum Role {
    STUDENT = 1,
    TEACHER = 2,
    ADMIN = 3, // Завуч
}

// Карта: какой префикс пути требует какого уровня доступа
// export const ROUTE_PERMISSIONS: Record<string, Role> = {
//     '/lessons': Role.STUDENT,  // Доступно всем
//     '/tasks': Role.STUDENT,    // Доступно всем
//     '/profile': Role.STUDENT,  // Доступно всем
//     '/journal': Role.TEACHER,  // Учитель и выше
//     '/review': Role.TEACHER,   // Учитель и выше
//     '/users': Role.ADMIN,      // Только завуч
//     '/settings': Role.ADMIN,   // Только завуч
//     '/analytics': Role.ADMIN,  // Только завуч
// };

// Вспомогательная функция для получения веса роли из строки
export const getRoleLevel = (roleName: string): Role => {
    switch (roleName?.toLowerCase()) {
        case 'admin': return Role.ADMIN;
        case 'teacher': return Role.TEACHER;
        default: return Role.STUDENT;
    }
};