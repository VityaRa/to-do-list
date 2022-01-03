import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { listApi } from "api/requests";
import { RootState } from "store";
import { addItem } from "store/reducers/listReducer";

import { Bar } from "components/bar";
import { Loader } from "components/common/loader";
import { List } from "components/common/list";

import style from "./style.module.scss";

export const Content = () => {
  const { sidebarList, activeListId } = useSelector(
    (state: RootState) => state.list
  );
  const { t } = useTranslation()
  const { email } = useSelector((state: RootState) => state.user);
  const { isProcessingFinished, title } = useSelector(
    (state: RootState) => state.list
  );

  const dispatch = useDispatch();

  const addItemHandler = async (value: string) => {
    const res = await listApi.addItemToList(activeListId, value);
    dispatch(addItem(res.data));
  };

  return (
    <div className={style.content}>
      <div className={style.bar_wrapper}>
        <Bar
          placeholder={t('input.placeholder.itemAdd')}
          onSuccess={addItemHandler}
          disabled={!email || !title}
        />
      </div>
      {isProcessingFinished ? (
      (sidebarList.find((list) => list._id === activeListId) ?? { items: [] })
        .items.length ? (
        <List
          items={[
            ...(sidebarList.find((list) => list._id === activeListId)?.items ??
              []),
          ].sort((a, b) => +a.isDone - +b.isDone)}
        />
      ) : (
        <h3 className={style.empty_text}>{t('content.label.emptyList')}</h3>
      )): <Loader />}
    </div>
  );
};
