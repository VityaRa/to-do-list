import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import { SidebarButton } from "../common/button";
import style from "./style.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const isOpenedSidebar = useSelector(
    (state: RootState) => state.sidebar.isOpen
  );
  const { title } = useSelector((state: RootState) => state.list);

  const sidebarClickHandler = () => {
    if (!isOpenedSidebar) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <h2 className={style.title}>{title}</h2>
        <SidebarButton isOpen={isOpenedSidebar} onClick={sidebarClickHandler} />
      </div>
    </header>
  );
};
