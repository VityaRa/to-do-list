import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { List } from "../common/list"
import style from "./style.module.scss"

export const Content = () => {
    const { list } = useSelector((state: RootState) => state.list)
    return (
        <div className={style.content}>
            <List items={[...list].sort((a, b) => +a.isDone - +b.isDone)} />
        </div>
    )
}
