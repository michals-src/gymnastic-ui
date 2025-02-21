export interface IWorkoutCalendar {
    key: string;
    values: IWorkout[];
}

export interface IWorkout {
    id: number;
    durationTime: string;
    createdAt: string;
}
