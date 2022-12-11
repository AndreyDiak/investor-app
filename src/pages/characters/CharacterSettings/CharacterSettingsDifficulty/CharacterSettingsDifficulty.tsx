import { Radio } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../features/hooks";
import { setDifficulty as setDifficultyAction } from "../../../../features/slices";
import {
  defaultDiffilculty,
  difficultyAbout,
  optionsDifficulty,
} from "../../../../features/slices/settings/models";
import { DifficultyType } from "../../../../features/slices/settings/typings";

import classes from "./../CharacterSettings.module.css";

const CharacterSettingsDifficulty = () => {
  const [difficulty, setDifficulty] = useState(defaultDiffilculty);
  const dispatch = useAppDispatch();

  const onChangeHandler = (d: DifficultyType) => {
    setDifficulty(d);
    dispatch(setDifficultyAction(d));
  };

  return (
    <div className={classes.block}>
      <h4 className={classes.header}>Сложность</h4>
      <Radio.Group
        options={optionsDifficulty}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={difficulty}
        optionType="button"
      />
      <div className={classes.about}>{difficultyAbout[difficulty]}</div>
    </div>
  );
};

export default CharacterSettingsDifficulty;
