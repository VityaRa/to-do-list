import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addItem, removeItem, toggleItem } from "../../../store/reducers/listReducer";
import { IItem } from "../../../types/interfaces"
import { Button, DoneButton, RemoveButton } from "../button"
import style from "./style.module.scss"

interface IProps {
    item: IItem,
}

export const Item = ({ item }: IProps) => {
    const dispatch = useDispatch();

    const add_item = () => {
        const item: IItem = {
            id: 15,
            description: 'none',
            isDone: false
        }
        dispatch(addItem(item))
    }

    const toggle_item = () => {
        dispatch(toggleItem(item))
    }

    const remove_item = () => {
        dispatch(removeItem(item.id))
    }

    return (
        <li className={classNames(style.container, {
            [style.done]: item.isDone
        })} >
            <div className={style.inner}>
                <div className={style.text_wrapper}>
                    <p>{item.description}</p>
                </div>
                <DoneButton onClick={toggle_item}/>
                <RemoveButton onClick={remove_item} />
            </div>
        </li>
    )
}
