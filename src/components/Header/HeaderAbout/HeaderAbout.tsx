import { Avatar } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import { selectCharacter } from "../../../redux/slices";

import classes from "./HeaderAbout.module.css";

export const HeaderAbout = () => {
  const character = useAppSelector(selectCharacter)!;

  return (
    <div className={classes.about}>
      <div>
        <Avatar src={character.photo.avatar} size={"default"} />
      </div>
      <div className={classes.text}>{character.name}</div>
    </div>
  );
};
