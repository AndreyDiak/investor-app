import { Radio } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../features/hooks";
import {
  selectDifficulty,
  setDifficulty as setDifficultyAction,
} from "../../../../features/slices";
import { DifficultyType } from "../../../../features/slices/settings/typings";
import { optionsDifficulty } from "../../../../models";

import classes from "./../CharacterSettings.module.css";

const CharacterSettingsDifficulty = () => {
  const [difficulty, setDifficulty] = useState(useAppSelector(selectDifficulty));
  const dispatch = useAppDispatch();

  const onChangeHandler = (d: DifficultyType) => {
    setDifficulty(d);
    dispatch(setDifficultyAction(d));
  };

  return (
    <div className={classes.block}>
      <h4 className={classes.header}>Сложность вспомогательных событий</h4>
      <Radio.Group
        options={optionsDifficulty}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={difficulty}
        optionType="button"
      />
    </div>
  );
};

export default CharacterSettingsDifficulty;
