export type ITodo = {
    id?: string;
    title: string;
    isCompleted: boolean;
}


export interface ILogin  {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    fullName: string;
}

export enum FilterBy {
    All = 'all',
    Completed = 'completed',
    Incompleted = 'incompleted',
}