import { DoubleRightOutlined, PauseOutlined, RightOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectConstTimeSpeed,
  selectTimeSpeed,
  setTimeSpeed,
} from "../../../redux/slices";
import { TimeIcon } from "../TimeIcon/TimeIcon";

import classes from "./HeaderTimeButtons.module.css";

export const HeaderTimeButtons = () => {
  const dispatch = useAppDispatch();

  const constTimeSpeed = useAppSelector(selectConstTimeSpeed);

  const time = useAppSelector(selectTimeSpeed);

  return (
    <div className={classes.icons}>
      <TimeIcon
        handleClick={() => dispatch(setTimeSpeed(0))}
        active={time === 0}
        children={<PauseOutlined />}
      />
      <TimeIcon
        handleClick={() => dispatch(setTimeSpeed(constTimeSpeed))}
        active={time === constTimeSpeed}
        children={<RightOutlined />}
      />
      <TimeIcon
        handleClick={() => dispatch(setTimeSpeed(constTimeSpeed / 2))}
        active={time === constTimeSpeed / 2}
        children={<DoubleRightOutlined />}
      />
    </div>
  );
};
