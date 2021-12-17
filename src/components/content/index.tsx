import { useDispatch, useSelector } from "react-redux";
import { api, listApi } from "../../api/requests";
import { RootState } from "../../store";
import { addItem } from "../../store/reducers/listReducer";
import { IList } from "../../types/interfaces";
import { Bar } from "../bar";
import { AddButton } from "../common/button";
import { List } from "../common/list";
import { Loader } from "../common/loader";
import style from "./style.module.scss";

export const Content = () => {
  const { sidebarList, activeListId } = useSelector(
    (state: RootState) => state.list
  );
  const { email } = useSelector((state: RootState) => state.user);
  const { isProcessingFinished, title } = useSelector(
    (state: RootState) => state.list
  );

  const dispatch = useDispatch();

  const addItemHandler = async (value: string) => {
    const res = await listApi.addItemToList(activeListId, value);
    dispatch(addItem(res.data));
  };

  return (
    <div className={style.content}>
      <div className={style.bar_wrapper}>
        <Bar
          placeholder={"Введите название задания..."}
          onSuccess={addItemHandler}
          disabled={!email || !title}
        />
      </div>
      {isProcessingFinished ? (
      (sidebarList.find((list) => list._id === activeListId) ?? { items: [] })
        .items.length ? (
        <List
          items={[
            ...(sidebarList.find((list) => list._id === activeListId)?.items ??
              []),
          ].sort((a, b) => +a.isDone - +b.isDone)}
        />
      ) : (
        <h3 className={style.empty_text}>Список пуст...</h3>
      )): <Loader />}
    </div>
  );
};
