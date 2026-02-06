export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Status = 'pending' | 'review' | 'completed';
export type View = 'Home' | 'Schedule' | 'Tasks' | 'Settings';

export interface Lesson {
    id: string;
    day: Day;
    slotIndex: number;
    title: string;
    teacher: string;
    description: string;
    homeworkTask: string;
    status: Status;
    grade?: number; // Оценка от 1 до 12
}

export interface NavItem {
    label: string;
    path: string;
    icon: string;
}