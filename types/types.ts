export const TASK_STATUSES = ['todo', 'in-progress', 'done'] as const

export type TaskStatus = typeof TASK_STATUSES[number]

export type Task = {
    id: number;
    title: string;
    status: TaskStatus;
};

export type Size = 'sm' | 'md' | 'lg'