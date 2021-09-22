import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, listApi } from "../../../../../api/requests";
import { RootState } from "../../../../../store";
import {
  removeItem,
  toggleItem,
  updateItem
} from "../../../../../store/reducers/listReducer";
import { cleanModal } from "../../../../../store/reducers/modalReducer";
import { IItem } from "../../../../../types/interfaces";
import { DoneButton, RemoveButton, SubmitButton } from "../../../button";
import style from "./style.module.scss";

interface IProps {
  item: IItem;
}

export const Info = ({ item }: IProps) => {
  const { activeListId } = useSelector((state: RootState) => state.list);

  const [value, setValue] = useState(item.description);
  const dispatch = useDispatch();

  const ref = useRef<any>(null);

  const toggle_item = async () => {
    await listApi.updateItemStatus(activeListId, item._id, !item.isDone)
    dispatch(toggleItem(item));
  };

  const remove_item = async () => {
    await listApi.removeItemFromList(activeListId, item._id);
    dispatch(removeItem(item._id));
    dispatch(cleanModal());
  };

  const isChangedDesc = (checkedValue: string) => {
    return checkedValue !== item.description;
  };

  const updateDesc = async () => {
    if (isChangedDesc(value)) {
      const res = await listApi.updateItemDesc(activeListId, item._id, value);
      dispatch(updateItem(res.data));
      dispatch(cleanModal());
    }
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Описание</h4>
      <textarea
        value={value}
        onInput={(e: any) => setValue(e.target.value)}
        className={style.textarea}
        name="task_info"
        id="task_info"
        cols={30}
        rows={10}
        ref={ref}
      ></textarea>
      <div className={style.submit_btn}>
        <SubmitButton content={"Сохранить"} onClick={() => updateDesc()} />
      </div>
      <div className={style.button_container}>
        <DoneButton onClick={toggle_item} />
        <RemoveButton onClick={remove_item} />
      </div>
    </div>
  );
};
