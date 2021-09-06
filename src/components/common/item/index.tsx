import classNames from "classnames";
import { useDispatch } from "react-redux";
import { api } from "../../../api/requests";
import { removeAsync } from "../../../functions/isRegister";
import {
  addItem,
  removeItem,
  toggleItem
} from "../../../store/reducers/listReducer";
import { IItem } from "../../../types/interfaces";
import { Button, DoneButton, RemoveButton } from "../button";
import style from "./style.module.scss";

interface IProps {
  item: IItem;
}

export const Item = ({ item }: IProps) => {
  const dispatch = useDispatch();

  const toggle_item = async () => {
    await api.toggleItem(item._id, item.isDone);
    dispatch(toggleItem(item));
  };

  const remove_item = async () => {
    await api.removeItem(item._id);
    dispatch(removeItem(item._id));
  };

  return (
    <li
      className={classNames(style.container, {
        [style.done]: item.isDone
      })}
    >
      <div className={style.inner}>
        <div className={style.text_wrapper}>
          <p>{item.description}</p>
        </div>
        <DoneButton onClick={toggle_item} />
        <RemoveButton onClick={remove_item} />
      </div>
    </li>
  );
};
