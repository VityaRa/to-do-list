import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { cleanModal, toggleModal } from "../../../store/reducers/modalReducer";
import style from "./style.module.scss";

export const Modal = () => {
  const { content, onClose } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  const outsideClick = (e: any) => {
    if (e.target.classList.contains(style.container)) {
      if (onClose) onClose()
      dispatch(cleanModal());
    }
  };

  return (
    <div className={style.container} onClick={outsideClick}>
      <div className={style.inner}>
        <div className={style.btn_container}>
          <button className={style.close_btn} onClick={closeModal}></button>
        </div>
        <div className={style.content}>{content}</div>
      </div>
    </div>
  );
};
