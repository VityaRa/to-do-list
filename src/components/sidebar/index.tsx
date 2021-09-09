import { useSelector } from "react-redux";
import { RootState } from "../../store";
import style from "./style.module.scss";

export const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  return <aside className={isOpen ? style.active : ""}>

  </aside>;
};
