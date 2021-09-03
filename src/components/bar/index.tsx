import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/requests";
import { addItem } from "../../store/reducers/listReducer";
import { AddButton } from "../common/button";
import style from "./style.module.scss";

export const Bar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<any>(null);

  const addItemHandler = async () => {
    if (value.trim() !== "") {
      const ans = await api.addItem(value);
      dispatch(addItem(ans.data))
      setValue("");
      ref.current.blur()
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && isFocused) {
      addItemHandler();
    }
  };

  return (
    <div className={style.container}>
      <input
        ref={ref}
        className={style.input}
        type="text"
        placeholder={"Введите задание..."}
        value={value}
        onInput={(e: any) => setValue(e.target.value)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyDown={handleKeyDown}
      />
      <AddButton onClick={addItemHandler} />
    </div>
  );
};
