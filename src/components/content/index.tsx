import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/requests";
import { RootState } from "../../store";
import { addItem } from "../../store/reducers/listReducer";
import { Bar } from "../bar";
import { AddButton } from "../common/button";
import { List } from "../common/list";
import style from "./style.module.scss";

export const Content = () => {
  const { list } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  const addItemHandler = async (value: string) => {
    const ans = await api.addItem(value);
    dispatch(addItem(ans.data));
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
