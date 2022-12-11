import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons/lib/icons";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import {
  decreaseCurrent,
  increaseCurrent,
  selectFilteredCharacters,
} from "../../../features/slices";
import { CharactersCard } from "../CharacterCard/CharacterCard";
import classes from "./CharactersList.module.css";

export const CharactersList = () => {
  const characters = useAppSelector(selectFilteredCharacters);
  const dispatch = useAppDispatch();
  // const current = useAppSelector(selectCurrent);

  return (
    <div className={classes.list}>
      <LeftOutlined
        className={classes.arrow}
        onClick={() => dispatch(decreaseCurrent())}
      />
      {characters.map((character) => (
        <CharactersCard character={character} />
      ))}
      <RightOutlined
        className={classes.arrow}
        onClick={() => dispatch(increaseCurrent())}
      />
    </div>
  );
};
