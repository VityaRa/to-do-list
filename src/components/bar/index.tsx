import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../api/requests";
import { addItem } from "../../store/reducers/listReducer";
import { AddButton } from "../common/button";
import style from "./style.module.scss";

interface IProps {
  onSuccess: (value: any) => void;
  placeholder: string;
  marginRight?: string;
}

export const Bar = ({ onSuccess, placeholder, marginRight = "3vw" }: IProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<any>(null);

  const clearInput = () => {
    setValue("");
    ref.current.blur();
  };

  const buttonClickHandler = async () => {
    if (value.trim() !== "") {
      onSuccess(value);
      clearInput();
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && isFocused) {
      onSuccess(value);
      clearInput();
    }
  };

  return (
    <div className={style.container}>
      <input
        ref={ref}
        className={style.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={(e: any) => setValue(e.target.value)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onKeyDown={handleKeyDown}
        style={{ marginRight }}
      />
      <AddButton onClick={buttonClickHandler} />
    </div>
  );
};
