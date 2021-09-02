import { useDispatch, useSelector } from "react-redux"
import { api } from "../../api/requests"
import { loadInitialData } from "../../functions/loadInitialData"
import { RootState } from "../../store"
import { AddButton } from "../common/button"
import { List } from "../common/list"
import style from "./style.module.scss"

export const Content = () => {
    const { list } = useSelector((state: RootState) => state.list)
    const dispatch = useDispatch();
    
    const addItemHandler = async () => {
        await api.addItem('wtas')
        await loadInitialData(dispatch)
    }

    return (
        <div className={style.content}>
            <AddButton onClick={addItemHandler}/>
            {list.length ? <List items={[...list].sort((a, b) => +a.isDone - +b.isDone)} /> : <h3>No tasks</h3> }
        </div>
    )
}
