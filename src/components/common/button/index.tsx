import { SettingsIcon } from "assets/SettingsIcon";
import classNames from "classnames";
import { AddIcon } from "../../../assets/AddIcon";
import { DoneIcon } from "../../../assets/DoneIcon";
import { Hamburger } from "../../../assets/HamburgerButton/HamburgerButton";
import { ButtonType } from "../../../utils/enums";
import style from "./style.module.scss";


interface IButton {
  onClick?: (e: any) => void;
  icon?: JSX.Element;
  type?: ButtonType;
  content?: any;
  isOpen?: boolean;
  className?: string,
  disabled?: boolean,
}

export const Button = ({ onClick, type, icon, content, className, disabled, isOpen }: IButton) => {
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
        [style.settings]: type === ButtonType.SETTINGS,
        [style.language]: type === ButtonType.LANGUAGE,
        [style.opened]: isOpen,
        [className ?? ""]: true,
        [style.disabled]: disabled
      })}
      disabled={disabled}
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

export const AddButton = ({ onClick, disabled }: Partial<IButton>) => {
  return (
    <Button type={ButtonType.ADD} onClick={onClick} disabled={disabled} icon={<AddIcon/>}></Button>
  );
};

export const RemoveButton = ({ onClick }: Partial<IButton>) => {
  return (
    <Button type={ButtonType.REMOVE} onClick={onClick} icon={<AddIcon/>}></Button>
  );
};

export const SubmitButton = ({ onClick, content, className }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.SUBMIT}
      onClick={onClick}
      content={content}
      className={className}
    ></Button>
  );
};

export const SidebarButton = ({ onClick, isOpen }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.SIDEBAR}
      onClick={onClick}
      content={<Hamburger/>}
    ></Button>
  );
};

export const SettingsButton = ({ onClick, isOpen }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.SETTINGS}
      onClick={onClick}
      isOpen={isOpen}
      content={<SettingsIcon/>}
    ></Button>
  );
};

export const LanguageButton = ({ onClick, content, className }: Partial<IButton>) => {
  return (
    <Button
      type={ButtonType.LANGUAGE}
      onClick={onClick}
      content={content}
      className={className ?? ''}
    ></Button>
  );
};