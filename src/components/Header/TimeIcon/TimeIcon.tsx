interface Props {
  handleClick: () => void;
  children: JSX.Element;
  active: boolean;
}

import classes from "./TimeIcon.module.css";

export const TimeIcon = ({ handleClick, children, active }: Props) => {
  return (
    <div
      style={{
        color: active ? "white" : "black",
      }}
      className={classes.icon}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
