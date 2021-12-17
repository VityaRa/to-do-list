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

interface IProps {
  item: IItem;
}

export const Item = ({ item }: IProps) => {

  const dispatch = useDispatch();
  const { activeListId } = useSelector((state: RootState) => state.list);

  const toggle_item = async () => {
    const newItem = await listApi.updateItemStatus(activeListId, item._id, !item.isDone);
    console.log(newItem.data);
    
    dispatch(toggleItem(newItem.data));
  };

  const remove_item = async () => {
    await listApi.removeItemFromList(activeListId, item._id);

    dispatch(removeItem(item._id));
  };

  const openInfoModal = () => {
    dispatch(setModal(<Info item={item} />));
    dispatch(toggleModal(true));
  };

  return (
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
  );
};
