import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listApi } from "../../api/requests";
import { setMainList } from "../../functions/setMainList";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store";
import {
  addSidebarItem,
  removeSidebarItem,
  setActiveListId,
  setSidebarList
} from "../../store/reducers/listReducer";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import { IItem, IList } from "../../types/interfaces";
import { Bar } from "../bar";
import { AddButton, RemoveButton, SubmitButton } from "../common/button";
import style from "./style.module.scss";
import Cookies from "js-cookie";
import { _COOKIES_ACTIVE_LIST_ID } from "../../utils/constants";
import { logout } from "../../functions/logout";
import { setModal, toggleModal } from "../../store/reducers/modalReducer";
import { SignIn } from "../common/modal/components/signIn";

export const Sidebar = () => {
  const { isOpen, searchWord } = useSelector(
    (state: RootState) => state.sidebar
  );
  const { email } = useSelector((state: RootState) => state.user);
  const { sidebarList, activeListId } = useSelector(
    (state: RootState) => state.list
  );
  const [hoveredId, setHoveredId] = useState<string>("");
  const dispatch = useDispatch();

  const ref = useOutsideClick(() => {
    if (isOpen) {
      dispatch(toggleSidebar());
    }
  });

  const itemClickHandler = async (item: IList) => {
    if (item._id !== activeListId) {
      const res = await listApi.getListById(item._id);
      setMainList(dispatch, res.data);
      Cookies.set(_COOKIES_ACTIVE_LIST_ID, item._id);
    }
    dispatch(toggleSidebar());
  };

  const createListHandler = async (title: string) => {
    const res = await listApi.createList(title);
    dispatch(addSidebarItem(res.data));
  };

  const removeListItem = async (item: IList) => {
    const res = await listApi.removeList(item._id);
    dispatch(removeSidebarItem(item));
  };

  const signInHandler = () => {
    dispatch(toggleSidebar());
    dispatch(setModal(<SignIn />));
    dispatch(toggleModal(true));
  };

  return (
    <aside className={isOpen ? style.active : ""} ref={ref}>
      <h2 className={style.title}>Ваши списки</h2>
      <div className={style.button}>
        <Bar
          placeholder={"Поиск/добавление списка"}
          onSuccess={createListHandler}
          marginRight={"10px"}
          type={"sidebar"}
        />
      </div>
      <ul>
        {sidebarList.length ? (
          sidebarList
            .filter(
              (list) =>
                list.title.includes(searchWord) ||
                list.items.some((item) => item.description.includes(searchWord))
            )
            .map((item) => {
              return (
                <li
                  key={item._id}
                  className={classNames(style.item, {
                    [style.active]: item._id === activeListId
                  })}
                  onClick={() => itemClickHandler(item)}
                  onMouseOver={() => setHoveredId(item._id)}
                  onMouseLeave={() => setHoveredId("")}
                >
                  <p className={style.text}>{item.title}</p>
                  <div className={style.right_info}>
                    <p className={style.count}>
                      {item.items.length
                        ? item.items.filter((elem) => !elem.isDone).length
                        : ""}
                    </p>
                    <div style={{ opacity: item._id === hoveredId ? 1 : 0 }}>
                      <RemoveButton
                        onClick={(e) => {
                          removeListItem(item);
                          e.stopPropagation();
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })
        ) : (
          <div className={style.empty_list}>
            <p>Здесь будут находится ваши списки</p>
          </div>
        )}
      </ul>
      <div className={style.button_container}>
        {email ? (
          <SubmitButton
            onClick={() => logout(dispatch)}
            content={"Выйти"}
          ></SubmitButton>
        ) : (
          <SubmitButton
            onClick={signInHandler}
            content={"Войти"}
          ></SubmitButton>
        )}
      </div>
    </aside>
  );
};
