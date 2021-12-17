import { IItem } from "../../../types/interfaces";
import { Item } from "../item";
import style from "./style.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './transition.css'

interface IProps {
  items: IItem[];
}

export const List = ({ items }: IProps) => {
  return (
      <TransitionGroup className={style.container} component={"ul"}>
        {items.map((item) => (
          <CSSTransition key={item._id} timeout={350} classNames="item">
            <Item key={item._id} item={item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
  );
};
