export interface IItem {
    readonly _id: string,
    description: string,
    isDone: boolean,
    creationDate?: string,
}

export interface IList {
    readonly _id: string,
    title: string,
    items: IItem[],
}