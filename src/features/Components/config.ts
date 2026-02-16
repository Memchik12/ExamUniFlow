import { Day, NavItem } from './types';


export const MOCK_API_TASKS_URL = "https://698790cc8bacd1d773edbce4.mockapi.io/tasks";
export const MOCK_API_USERS_URL = "https://698790cc8bacd1d773edbce4.mockapi.io/users";


export const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SCHEDULE_TIMES = [
    { label: "I пара", time: "8:30 - 9:50" },
    { label: "II пара", time: "10:05 - 11:25" },
    { label: "III пара", time: "11:55 - 13:15" },
    { label: "IV пара", time: "13:30 - 14:50" },
    { label: "V пара", time: "15:05 - 16:25" },
];

export const SIDEBAR_MENU: NavItem[] = [
    { label: 'Главная', path: '/profile', icon: '🏠' },
    { label: 'Мои уроки', path: '/lessons', icon: '📚' },
    { label: 'Задания', path: '/tasks', icon: '📝' },
    { label: 'Настройки', path: '/settings', icon: '⚙️' },
];