import { Radio } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import {
   setConstTimeSpeed,
   TimeSpeed,
   setTimeSpeed as setTimeSpeedAction,
} from "../../../../redux/slices";

import { defaultTimeSpeed, optionsTime } from "../../../../models";

import classes from "./../CharacterSettings.module.css";

const CharacterSettingsTimeSpeed = () => {
   const [timeSpeed, setTimeSpeed] = useState(defaultTimeSpeed);

   const dispatch = useAppDispatch();

   const onChangeHandler = (t: TimeSpeed) => {
      setTimeSpeed(t);
      dispatch(setConstTimeSpeed(t));
      dispatch(setTimeSpeedAction(t));
   };

   return (
      <div className={classes.block}>
         <h4 className={classes.header}>Скорость игры</h4>
         <Radio.Group
            options={optionsTime}
            onChange={(e) => onChangeHandler(e.target.value)}
            value={timeSpeed}
            optionType="button"
         />
      </div>
   );
};

export default CharacterSettingsTimeSpeed;
