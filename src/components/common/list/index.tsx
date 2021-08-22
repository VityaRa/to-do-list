import { IItem } from "../../../types/interfaces"
import { Item } from "../item"
import style from "./style.module.scss"

interface IProps {
    items: IItem[],
}

export const List = ({ items }: IProps) => {
    return (
        <ul className={style.container}>
            {items.map((item, index) => <Item key={index} item={item}/>)}
        </ul>
    )
}
