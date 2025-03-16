export interface SharedExercisesStoreModel {
    dataSource: Array<SharedExerciseModel>;
}

export interface SharedExerciseModel {
    id: number;
    key: string;
    values: any;
}
