import { useDispatch, useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState } from "../../store";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import style from "./style.module.scss";

export const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
	const dispatch = useDispatch();

  const ref = useOutsideClick(() => {
		if (isOpen) {
			dispatch(toggleSidebar())
		}
		
	});

  return (
    <aside className={isOpen ? style.active : ""} ref={ref}>
      <h2 className={style.title}>Ваши списки</h2>
    </aside>
  );
};
