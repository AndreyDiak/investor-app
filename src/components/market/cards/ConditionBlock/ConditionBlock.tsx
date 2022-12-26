import { FallOutlined, RiseOutlined, ShrinkOutlined } from "@ant-design/icons";
import { Condition } from "../../../../redux/slices/game/market/typings";

import classes from './ConditionBlock.module.css'

const stockConditionToIconMap = {
   up: <RiseOutlined className={classes.icon} style={{ color: "#128900" }} />,
   down: <FallOutlined className={classes.icon} style={{ color: "#820000" }} />,
   "not-changed": (
      <ShrinkOutlined className={classes.icon} style={{ color: "#afafaf" }} />
   ),
};

export const ConditionBlock = ({ condition }: { condition: Condition }) =>
   stockConditionToIconMap[condition]
