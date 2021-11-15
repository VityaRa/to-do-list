import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, listApi } from "../../../api/requests";
import { RootState } from "../../../store";
import { removeItem, toggleItem } from "../../../store/reducers/listReducer";
import { setModal, toggleModal } from "../../../store/reducers/modalReducer";
import { IItem } from "../../../types/interfaces";
import { Button, DoneButton, RemoveButton } from "../button";
import { Info } from "../modal/components/info";
import style from "./style.module.scss";
import { CSSTransition } from "react-transition-group";

interface IProps {
  item: IItem;
}

export const Item = ({ item }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const dispatch = useDispatch();
  const { activeListId } = useSelector((state: RootState) => state.list);

  const toggle_item = async () => {
    setIsLoaded(false);
    await listApi.updateItemStatus(activeListId, item._id, !item.isDone);
    setIsLoaded(true);
    dispatch(toggleItem(item));
  };

  const remove_item = async () => {
    setIsLoaded(false);
    await listApi.removeItemFromList(activeListId, item._id);
    setIsLoaded(true);

    dispatch(removeItem(item._id));
  };

  const openInfoModal = () => {
    dispatch(setModal(<Info item={item} />));
    dispatch(toggleModal(true));
  };

  return (
    <CSSTransition in={isLoaded} timeout={150} classNames="alert" unmountOnExit>
      <li
        className={classNames(style.container, {
          [style.done]: item.isDone
        })}
        onClick={openInfoModal}
      >
        <div className={style.inner}>
          <div className={style.text_wrapper}>
            <p>{item.description}</p>
          </div>
          <DoneButton
            onClick={(e) => {
              e.stopPropagation();
              toggle_item();
            }}
          />
          <RemoveButton
            onClick={(e) => {
              e.stopPropagation();
              remove_item();
            }}
          />
        </div>
      </li>
    </CSSTransition>
  );
};
