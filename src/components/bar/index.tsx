import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/requests";
import { loadInitialData } from "../../functions/loadInitialData";
import { AddButton } from "../common/button";
import style from "./style.module.scss";

export const Bar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const addItemHandler = async () => {
    if (value.trim() !== "") {
      await api.addItem(value);
      await loadInitialData(dispatch);
      setValue('')
    }
  };

  useEffect(() => {
    const handleFocus = (e: KeyboardEvent) => {
      if (isFocused && e.key === 'Enter') {
        addItemHandler()
      }
    }

    window.addEventListener('keypress', handleFocus)
    return (() => {
      window.removeEventListener('keypress', handleFocus)
    })

  }, [isFocused])

  return (
    <div className={style.container}>
      <input
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
      />
      <AddButton onClick={addItemHandler} />
    </div>
  );
};
