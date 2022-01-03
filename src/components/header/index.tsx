import React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { listApi } from "../../api/requests";
import { RootState } from "../../store";
import { setTitle, updateSidebarItem } from "../../store/reducers/listReducer";
import { setModal, toggleModal } from "../../store/reducers/modalReducer";
import { toggleSettings, toggleSidebar } from "../../store/reducers/sidebarReducer";
import { SettingsButton, SidebarButton, SubmitButton } from "../common/button";
import { SignIn } from "../common/modal/components/signIn";
import style from "./style.module.scss";

export const trimSpaceRegex = /\s\s+/g;

export const Header = () => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const isOpenedSidebar = useSelector(
    (state: RootState) => state.sidebar.isOpen
  );
  const {isOpenedSettings} = useSelector(
    (state: RootState) => state.sidebar
  );
  const { t } = useTranslation()

  const { title, activeListId } = useSelector((state: RootState) => state.list);
  const { email } = useSelector((state: RootState) => state.user);

  const ref = useRef<any>(null);

  const sidebarClickHandler = () => {
    if (!isOpenedSidebar) {
      dispatch(toggleSidebar());
    }
  };

  const settingsClickHandler = () => {
    if (!isOpenedSettings) {
      dispatch(toggleSettings());
    }
  };


  const nonRegisterTitleClick = () => {
    dispatch(setModal(<SignIn />));
    dispatch(toggleModal(true));
  };

  const nonTitleClick = () => {
    if (!isOpenedSidebar) {
      dispatch(toggleSidebar());
    }
  }

  const updateTitleHandler = async () => {
    if (value !== title && value.length <= 15 && value.length) {
      try {
        const res = await listApi.updateListTitle(activeListId, value.trim());
        dispatch(setTitle(res.data.title));
        dispatch(updateSidebarItem(res.data));
      } catch (e) {
        alert(t('error.header.emptyTitle'));
      }
    } else {
      alert(t('error.header.newTitle'))
      setValue(title);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && isFocused) {
      ref.current.blur();
    }
  };

  const titleRef = useRef(null);

  useEffect(() => {
    setValue(title.replace(trimSpaceRegex, " "));
  }, [title]);

  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <SettingsButton isOpen={isOpenedSettings} onClick={settingsClickHandler} />
        {email ? (
          title ? (
            <input
              ref={ref}
              className={style.input}
              onFocus={() => {
                setIsFocused(true);
                setValue(title.replace(trimSpaceRegex, " "));
              }}
              onBlur={() => {
                setIsFocused(false);
                updateTitleHandler();
              }}
              onKeyDown={handleKeyDown}
              onInput={(e: any) => setValue(e.target.value)}
              type="text"
              value={value}
            />
          ) : (
            <SubmitButton
              onClick={nonTitleClick}
              content={"Создать список"}
              className={style.defaultWidth}
            ></SubmitButton>
          )
        ) : (
          <SubmitButton
            onClick={nonRegisterTitleClick}
            content={t('button.toSignIn')}
            className={style.defaultWidth}
          ></SubmitButton>
        )}
        <SidebarButton isOpen={isOpenedSidebar} onClick={sidebarClickHandler} />
      </div>
    </header>
  );
};
