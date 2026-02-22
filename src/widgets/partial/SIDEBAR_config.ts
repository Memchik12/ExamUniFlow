import {Role} from "@/src/features/RuleRestrictions/permissions";

export interface NavItem {
    label: string;
    path: string;
    icon: string;
    minRole : Role
}

export const SIDEBAR_MENU: NavItem[] = [
    { path: '/profile', label: 'Профиль', icon: '👤',        minRole: Role.STUDENT },
    { path: '/lessons', label: 'Уроки', icon: '📖',          minRole: Role.STUDENT },
    { path: '/tasks',   label: 'Задания', icon: '📚',        minRole: Role.STUDENT },
    { path: '/journal', label: 'Журнал', icon: '📊',         minRole: Role.TEACHER },
    { path: '/review',  label: 'Проверка', icon: '🔍',       minRole: Role.TEACHER },
    { path: '/users',   label: 'Пользователи', icon: '👥',   minRole: Role.ADMIN },
    { path: '/settings',label: 'Настройки', icon: '⚙️',      minRole: Role.STUDENT },
];