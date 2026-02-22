import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import { ROUTE_PERMISSIONS, getRoleLevel } from './features/RuleRestrictions/permissions';

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value;
    const { pathname } = request.nextUrl;

    // 1. Пропускаем статику и логин
    if (pathname.startsWith('/_next') || pathname.includes('.') || pathname === '/login') {
        return NextResponse.next();
    }

    // 2. Редирект, если нет сессии
    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Парсим роль из куки
    let userRoleName = 'student';
    try {
        userRoleName = JSON.parse(sessionCookie).role;
    } catch (e) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // const userLevel = getRoleLevel(userRoleName);
    //
    // // 4. ПРОВЕРКА ПРАВ (Динамическая)
    // // Ищем в конфиге самый длинный подходящий префикс
    // const requiredRole = Object.entries(ROUTE_PERMISSIONS)
    //     .sort((a, b) => b[0].length - a[0].length) // Сначала проверяем длинные пути
    //     .find(([path]) => pathname.startsWith(path))?.[1];
    //
    // // Если путь требует уровня выше, чем есть у юзера — кидаем на главную
    // if (requiredRole && userLevel < requiredRole) {
    //     console.warn(`Access denied for ${userRoleName} to ${pathname}`);
    //     return NextResponse.redirect(new URL('/tasks', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};