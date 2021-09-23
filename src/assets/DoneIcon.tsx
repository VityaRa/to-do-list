import style from "./style.module.scss";

export const DoneIcon = () => {
  return (
    <div className={style.icon}>
      <svg width="25" height="25" viewBox="0 0 50 96" fill="none">
        <line
          x1="3.45568"
          y1="51.7472"
          x2="29.7472"
          y2="92.5443"
          stroke={"#ffffff"}
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M30 92L72.1909 4.0324"
          stroke={"#ffffff"}
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
