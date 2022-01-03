import classNames from "classnames";
import { useOutsideClick } from "hooks/useOutsideClick";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleSettings } from "store/reducers/sidebarReducer";

import style from "./style.module.scss";

export const Settings = React.memo(() => {
  const { isOpenedSettings } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    </aside>
  );
});
