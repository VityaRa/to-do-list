import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listApi } from "../../api/requests";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store";
import { addSidebarItem, removeSidebarItem, setActiveListId, setSidebarList } from "../../store/reducers/listReducer";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import { IList } from "../../types/interfaces";
import { Bar } from "../bar";
import { AddButton, RemoveButton } from "../common/button";
import style from "./style.module.scss";

export const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { sidebarList, activeListId } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();

  const ref = useOutsideClick(() => {
    if (isOpen) {
      dispatch(toggleSidebar());
    }
  });

  const itemClickHandler = (item: IList) => {
    dispatch(setActiveListId(item))
    dispatch(toggleSidebar());
  };

  const createListHandler = async (title: string) => {
    const res = await listApi.createList(title);
    dispatch(addSidebarItem(res.data))
  };

  const removeListItem = async (item: IList) => {
    const res = await listApi.removeList(item._id)
    dispatch(removeSidebarItem(item))
  }

  return (
    <aside className={isOpen ? style.active : ""} ref={ref}>
      <h2 className={style.title}>Ваши списки</h2>
      <div className={style.button}>
        <Bar
          placeholder={"Введите название списка"}
          onSuccess={createListHandler}
          marginRight={"10px"}
        />
      </div>
      <ul>
        {sidebarList.map((item) => {
          return (
            <li
              key={item._id}
              className={classNames(style.item, {
                [style.active]: item._id === activeListId
              })}
              onClick={() => itemClickHandler(item)}
            >
              <p className={style.text}>{item.title}</p>
              <RemoveButton onClick={(e) => {removeListItem(item); e.stopPropagation()}} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
