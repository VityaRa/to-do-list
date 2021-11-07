import { useState } from "react";
import { useDispatch } from "react-redux";
import { userApi } from "../../../../../api/requests";
import {
  dataCheck,
  errorMessage,
  labelMessage
} from "../../../../../functions/dataCheck";
import {
  cleanModal,
  setModal
} from "../../../../../store/reducers/modalReducer";
import { setUser } from "../../../../../store/reducers/userReducer";
import {
  _COOKIES_ACCESS,
  _COOKIES_EMAIL,
  _COOKIES_USER_ID
} from "../../../../../utils/constants";
import { Button, SubmitButton } from "../../../button";
import { Input } from "../../../input";
import { SignUp } from "../signUp";
import style from "./style.module.scss";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const dispatch = useDispatch();

  const signInHandler = async () => {
    try {
      const res = await userApi.login(email, password);
      localStorage.setItem(_COOKIES_ACCESS, res.data.token);
      dispatch(setUser({ email: res.data.email }));
      dispatch(cleanModal());
      setIsCorrect(true);
    } catch (e) {
      setIsCorrect(false);
    }
  };

  const openSignUp = () => {
    dispatch(setModal(<SignUp />));
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Вход</h2>
      {!isCorrect && <p className={style.error}>Введены неверные данные</p>}
      <div className={style.input}>
        <Input
          value={email}
          onChangeHandler={(e) => setEmail(e.target.value)}
          placeholder={labelMessage.email}
          type="email"
        />
      </div>
      <div className={style.input}>
        <Input
          value={password}
          onChangeHandler={(e) => setPassword(e.target.value)}
          placeholder={labelMessage.password}
          type="password"
        />
      </div>
      <div className={style.extra}>
        <p>
          Нет аккаунта? <span onClick={openSignUp}>Зарегистрируйтесь</span>
        </p>
      </div>
      <SubmitButton content={"Войти"} onClick={signInHandler}></SubmitButton>
    </div>
  );
};
