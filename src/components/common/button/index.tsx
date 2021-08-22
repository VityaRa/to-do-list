import classNames from "classnames"
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
        <button onClick={onClick} className={classNames(style.container, {
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

export const RemoveButton = () => {
    return (
        <Button type={ButtonType.DONE} onClick={() => {}} ></Button>
    )
}
