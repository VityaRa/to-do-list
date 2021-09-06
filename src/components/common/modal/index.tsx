import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import style from "./style.module.scss";

export const Modal = () => {
  const content = useSelector((state: RootState) => state.modal.content);
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.btn_container}>
          <button className={style.close_btn}></button>
        </div>
        <div className={style.content}>{content}</div>
      </div>
    </div>
  );
};
