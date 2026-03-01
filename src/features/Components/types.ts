import {Role} from "@/src/features/RuleRestrictions/permissions";

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Status = 'pending' | 'review' | 'completed';
export type View = 'Home' | 'Schedule' | 'Tasks' | 'Settings';
export type HomeWork = string | Task;



export interface Lesson {
    id: string;
    day: Day;
    slotIndex: number;
    title: string;
    teacher: string;
    description: string;
    homeworkTask: HomeWork;
    status: Status;
}

export interface Task {
    id: string;
    title: string;
    teacher: string;
    description: string;
    homeworkTask: string;
    status: Status;
    grade?: number; // Оценка 1-12
    fileName?: string;
}



export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    group: string;
    course: string;
    nameEducationalinstItution: string;
    role : Role;
    avatar : string;
}
