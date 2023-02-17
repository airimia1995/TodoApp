export type ITodo = {
    id?: string;
    title: string;
    isCompleted: boolean;
}

export enum FilterBy {
    All = 'all',
    Completed = 'completed',
    Incompleted = 'incompleted',

}