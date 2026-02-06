export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Status = 'pending' | 'review' | 'completed';

export interface Lesson {
    id: string;
    day: Day; // Изменено с dayIndex на Day
    slotIndex: number;
    title: string;
    teacher: string;
    description: string;
    homeworkTask: string;
    status: Status;
}

export interface NavItem {
    label: string;
    path: string;
    icon: string;
}