import classNames from "classnames";
import { LanguageButton } from "components/common/button";
import { useOutsideClick } from "hooks/useOutsideClick";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleSettings } from "store/reducers/sidebarReducer";
import { setLanguage } from "store/reducers/userReducer";
import { LOCAL_STORAGE_LANG } from "utils/constants";
import { LANG } from "utils/enums";

import style from "./style.module.scss";

export const Settings = React.memo(() => {
  const { isOpenedSettings } = useSelector((state: RootState) => state.sidebar);
  const { lang } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    dispatch(setLanguage(lang))
    localStorage.setItem(LOCAL_STORAGE_LANG, lang)
    closeSettings()
  }

  const closeSettings = () => {
    if (isOpenedSettings) {
      dispatch(toggleSettings())
    }
  }

  const buttonsContent = [
    {
      language: LANG.ENG,
      onClick: () => changeLanguage(LANG.ENG),
    },
    {
      language: LANG.RUS,
      onClick: () => changeLanguage(LANG.RUS),
    }
  ]

  const ref = useOutsideClick(() => {
    if (isOpenedSettings) {
      dispatch(toggleSettings());
    }
  });

  return (
    <aside
      className={classNames(style.settings, {
        [style.active]: isOpenedSettings
      })}
      ref={ref}
    >
      <h2 className={style.title}>{t("settings.label.title")}</h2>
      <section className={style.section}>
        <h3 className={style.subtitle}>{t('settings.label.language')}</h3>
        <div className={style.btnContainer}>
          <div className={style.btnWrapper}>
            {
              buttonsContent.map(button => (
                <LanguageButton content={button.language} onClick={button.onClick} className={lang === button.language ? style.activeButton : ''}/>
              ))
            }
          </div>
        </div>
      </section>
    </aside>
  );
});
