export interface IItem {
    readonly _id: string,
    description: string,
    isDone: boolean,
}

export interface IList {
    readonly _id: string,
    title: string,
}

export interface IListNoState {
    readonly _id: string,
    title: string,
    items: IItem[],
}