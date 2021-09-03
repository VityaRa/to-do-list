import classNames from "classnames"
import { AddIcon } from "../../../assets/AddIcon"
import { DoneIcon } from "../../../assets/DoneIcon"
import { IItem } from "../../../types/interfaces"
import { ButtonType } from "../../../utils/enums"
import style from "./style.module.scss"

interface IButton {
    onClick?: () => void,
    icon?: JSX.Element,
    type?: ButtonType,
}

export const Button = ({ onClick, type, icon }: IButton) => {
    return (
        <button name={type} onClick={onClick} className={classNames(style.container, {
            [style.done]: type === ButtonType.DONE,
            [style.remove]: type === ButtonType.REMOVE,
            [style.add]: type === ButtonType.ADD,
        })}>
            {
                icon &&
                <div className={style.icon_wrapper}>
                    {icon}
                </div>
            }
        </button>
    )
}

export const DoneButton = ({onClick}: Partial<IButton>) => {
    return (
        <Button type={ButtonType.DONE} onClick={onClick} icon={DoneIcon} ></Button>
    )
}

export const AddButton = ({onClick}: Partial<IButton>) => {
    return (
        <Button type={ButtonType.ADD} onClick={onClick} icon={AddIcon} ></Button>
    )
}

export const RemoveButton = ({onClick}: Partial<IButton>) => {
    return (
        <Button type={ButtonType.REMOVE} onClick={onClick} icon={AddIcon} ></Button>
    )
}


