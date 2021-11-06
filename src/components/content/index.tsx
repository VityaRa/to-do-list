import { useDispatch, useSelector } from "react-redux";
import { api, listApi } from "../../api/requests";
import { RootState } from "../../store";
import { addItem } from "../../store/reducers/listReducer";
import { IList } from "../../types/interfaces";
import { Bar } from "../bar";
import { AddButton } from "../common/button";
import { List } from "../common/list";
import style from "./style.module.scss";

export const Content = () => {
  const { list, activeListId } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  const addItemHandler = async (value: string) => {
    const res = await listApi.addItemToList(activeListId, value);
    dispatch(addItem(res.data));
  };


  
  return (
    <div className={style.content}>
      <Bar placeholder={"Введите название задания..."} onSuccess={addItemHandler} />
      {list.length ? (
        <List items={[...list].sort((a, b) => +a.isDone - +b.isDone)} />
      ) : (
        <h3 className={style.empty_text}>Список пуст...</h3>
      )}
    </div>
  );
};
