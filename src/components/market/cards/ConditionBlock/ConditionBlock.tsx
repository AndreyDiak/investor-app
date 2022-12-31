import { FallOutlined, RiseOutlined, ShrinkOutlined } from "@ant-design/icons";
import { Conditions } from "../../../../models";

import classes from "./ConditionBlock.module.css";

const stockConditionToIconMap = {
   up: <RiseOutlined className={classes.icon} style={{ color: "#128900" }} />,
   down: <FallOutlined className={classes.icon} style={{ color: "#820000" }} />,
   "not-changed": (
      <ShrinkOutlined className={classes.icon} style={{ color: "#afafaf" }} />
   ),
};

export const ConditionBlock = ({ condition }: { condition: Conditions }) =>
   stockConditionToIconMap[condition];
