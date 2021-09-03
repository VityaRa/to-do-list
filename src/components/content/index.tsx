import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/requests";
import { RootState } from "../../store";
import { Bar } from "../bar";
import { AddButton } from "../common/button";
import { List } from "../common/list";
import style from "./style.module.scss";

export const Content = () => {
  const { list } = useSelector((state: RootState) => state.list);

  return (
    <div className={style.content}>
      <Bar />
      {list.length ? (
        <List items={[...list].sort((a, b) => +a.isDone - +b.isDone)} />
      ) : (
        <h3 className={style.empty_text}>Список пуст...</h3>
      )}
    </div>
  );
};
