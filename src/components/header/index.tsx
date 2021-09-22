import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listApi } from "../../api/requests";
import { RootState } from "../../store";
import { setTitle, updateSidebarItem } from "../../store/reducers/listReducer";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import { SidebarButton } from "../common/button";
import style from "./style.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const isOpenedSidebar = useSelector(
    (state: RootState) => state.sidebar.isOpen
  );
  const { title, activeListId } = useSelector((state: RootState) => state.list);

  const ref = useRef<any>(null);

  const sidebarClickHandler = () => {
    if (!isOpenedSidebar) {
      dispatch(toggleSidebar());
    }
  };

  const updateTitleHandler = async () => {
    if (value !== title) {
      try {
        const res = await listApi.updateListTitle(activeListId, value);

        dispatch(setTitle(res.data.title));
        dispatch(updateSidebarItem(res.data));
      } catch (e) {
        alert("Введите название");
      }
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && isFocused) {
      updateTitleHandler();
      ref.current.blur();
    }
  };

  const titleRef = useRef(null);
  return (
    <header className={style.container}>
      <div className={style.wrapper}>
        <input
          ref={ref}
          className={style.input}
          onFocus={() => {
            setIsFocused(true);
            setValue(title);
          }}
          onBlur={() => {
            setIsFocused(false);
            setValue("");
            updateTitleHandler();
          }}
          onKeyDown={handleKeyDown}
          onInput={(e: any) => setValue(e.target.value)}
          type="text"
          value={value}
        />
        <h2
          className={style.title}
          ref={titleRef}
          style={{ opacity: isFocused ? 0 : 1 }}
        >
          {title}
        </h2>
        <SidebarButton isOpen={isOpenedSidebar} onClick={sidebarClickHandler} />
      </div>
    </header>
  );
};
