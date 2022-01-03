import { t } from "i18next";
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
import { SignIn } from "../signIn";
import style from "./style.module.scss";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const registerHandler = async () => {
    const res = await userApi.register(email, password);

    localStorage.setItem(_COOKIES_ACCESS, res.data.token);
    // localStorage.setItem(_COOKIES_USER_ID, res.data.id);
    // localStorage.setItem(_COOKIES_EMAIL, res.data.email);

    dispatch(setUser({ email: res.data.email }));
    dispatch(cleanModal());
  };



  const openSignIn = () => {
    dispatch(setModal(<SignIn />));
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>{t('modal.title.registration')}</h2>
      <div className={style.input}>
        <Input
          value={email}
          onChangeHandler={(e) => setEmail(e.target.value)}
          checkError={dataCheck.email}
          errorText={t('modal.error.email')}
          placeholder={t('modal.placeholder.email')}
        />
      </div>
      <div className={style.input}>
        <Input
          value={password}
          onChangeHandler={(e) => setPassword(e.target.value)}
          checkError={dataCheck.password}
          errorText={t('modal.error.password')}
          placeholder={t('modal.placeholder.password')}
        />
      </div>
      <div className={style.extra}>
        <p>
          {t('modal.label.haveAccount')} <span onClick={openSignIn}>{t('button.toSignIn_v2')}</span>
        </p>
      </div>
      <SubmitButton
        content={t('button.toSignUp')}
        onClick={registerHandler}
      ></SubmitButton>
    </div>
  );
};
