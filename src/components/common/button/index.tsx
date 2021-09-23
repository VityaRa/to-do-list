import classNames from "classnames";
import { AddIcon } from "../../../assets/AddIcon";
import { DoneIcon } from "../../../assets/DoneIcon";
import { Hamburger } from "../../../assets/HamburgerButton/HamburgerButton";
import { IItem } from "../../../types/interfaces";
import { ButtonType } from "../../../utils/enums";
import style from "./style.module.scss";


interface IButton {
  onClick?: (e: any) => void;
  icon?: JSX.Element;
  type?: ButtonType;
  content?: any;
  isOpen?: boolean;
}

export const Button = ({ onClick, type, icon, content }: IButton) => {
  return (
    <button
      name={type}
      onClick={onClick}
      className={classNames(style.container, {
        [style.done]: type === ButtonType.DONE,
        [style.remove]: type === ButtonType.REMOVE,
        [style.add]: type === ButtonType.ADD,
        [style.submit]: type === ButtonType.SUBMIT,
        [style.sidebar]: type === ButtonType.SIDEBAR,
      })}
    >
      {icon && <div className={style.icon_wrapper}>{icon}</div>}
      {content}
    </button>
  );
};

export const DoneButton = ({ onClick }: Partial<IButton>) => {
  return (
    <Button type={ButtonType.DONE} onClick={onClick} icon={<DoneIcon/>}></Button>
  );
};

export const AddButton = ({ onClick }: Partial<IButton>) => {
  return (
    <Button type={ButtonType.ADD} onClick={onClick} icon={<AddIcon/>}></Button>
  );
};

export const RemoveButton = ({ onClick }: Partial<IButton>) => {
  return (
    <Button type={ButtonType.REMOVE} onClick={onClick} icon={<AddIcon/>}></Button>
  );
};

export const SubmitButton = ({ onClick, content }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.SUBMIT}
      onClick={onClick}
      content={content}
    ></Button>
  );
};

export const SidebarButton = ({ onClick, isOpen }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.SIDEBAR}
      onClick={onClick}
      isOpen={isOpen}
      content={<Hamburger/>}
    ></Button>
  );
};
