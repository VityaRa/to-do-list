import { IItem } from "../../../types/interfaces"
import { Item } from "../item"
import style from "./style.module.scss"

interface IProps {
    items: IItem[],
}

export const List = ({ items }: IProps) => {
    return (
        <ul className={style.container}>
            {items.map((item) => <Item key={item._id} item={item}/>)}
        </ul>
    )
}
