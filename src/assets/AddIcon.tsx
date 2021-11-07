import style from "./style.module.scss";

interface IProps {
  width?: number;
  height?: number;
}

export const AddIcon = ({ width, height }: IProps) => {
  return (
    <div className={style.icon}>
      <svg
        width={width || 30}
        height={height || 30}
        viewBox="0 0 100 100"
        fill="none"
      >
        <line
          x1="50.5"
          y1="2.5"
          x2="50.5"
          y2="97.5"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="2.5"
          y1="47.5"
          x2="97.5"
          y2="47.5"
          stroke="#fff"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
