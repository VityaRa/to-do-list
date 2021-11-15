import style from "./style.module.scss";

export const Loader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}></div>
    </div>
  );
};
