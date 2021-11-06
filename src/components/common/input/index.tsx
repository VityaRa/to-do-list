import { useEffect, useState } from "react";
import style from "./style.module.scss";

interface IProps {
  value: string;
  onChangeHandler: (value: any) => void;
  checkError?: (value: string) => boolean;
  type?: string;
  errorText?: string;
  placeholder?: string;
  label?: string;
}

export const Input = ({
  type,
  value,
  errorText,
  onChangeHandler,
  checkError,
  placeholder,
  label
}: IProps) => {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(checkError ? !checkError(value) : false);
  }, [value]);

  return (
    <div className={style.container}>
      {label && <p>{label}</p>}
      <input
        type={type ? type : "text"}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder || ""}
        className={[style.input, isError ? style.wrong : ""].join(" ")}
      ></input>
      {isError && <p>{errorText}</p>}
    </div>
  );
};
