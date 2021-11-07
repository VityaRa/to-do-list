import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSearchWord } from "../../store/reducers/sidebarReducer";
import { AddButton } from "../common/button";
import style from "./style.module.scss";

interface IProps {
  onSuccess: (value: any) => void;
  placeholder: string;
  marginRight?: string;
  type?: string;
}

export const Bar = ({
  onSuccess,
  placeholder,
  marginRight = "3vw",
  type = "main"
}: IProps) => {
  const [value, setValue] = useState("");
  const { activeListId } = useSelector((state: RootState) => state.list);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    clearInput();
  }, [activeListId]);

  const clearInput = () => {
    setValue("");
    ref.current.blur();
    dispatch(setSearchWord(""));
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
    <div
      className={classNames(style.container, {
        [style.sidebar_container]: type === "sidebar"
      })}
    >
      <input
        ref={ref}
        className={style.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onInput={(e: any) => {
          setValue(e.target.value);
          dispatch(setSearchWord(e.target.value));
        }}
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
