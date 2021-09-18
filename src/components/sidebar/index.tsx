import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import style from "./style.module.scss";

const data = [
  { id: 1, title: "ToDo" },
  { id: 2, title: "1" },
  { id: 3, title: "2" },
  { id: 4, title: "qwd" },
  { id: 5, title: "4" }
];

export const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  const ref = useOutsideClick(() => {
    if (isOpen) {
      dispatch(toggleSidebar());
    }
  });

  const itemClickHandler = () => {
    dispatch(toggleSidebar());
  };

  return (
    <aside className={isOpen ? style.active : ""} ref={ref}>
      <h2 className={style.title}>Ваши списки</h2>
      <ul>
        {data.map((item) => {
          return (
            <li
              key={item.id}
              className={classNames(style.item, {
                [style.active]: item.id === 1
              })}
              onClick={itemClickHandler}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
