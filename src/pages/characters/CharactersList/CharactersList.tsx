import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons/lib/icons";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import {
  decreaseCurrent,
  increaseCurrent,
  selectFilteredCharacters,
} from "../../../features/slices";
import { CharactersCard } from "../CharacterCard/CharacterCard";

import { motion } from "framer-motion";

import classes from "./CharactersList.module.css";
import { Person } from "../../../features/slices/characters/typings";

interface Props {
  selectCharacter: (character: Person) => void;
}

export const CharactersList = ({ selectCharacter }: Props) => {
  const characters = useAppSelector(selectFilteredCharacters);
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className={classes.list}
      initial={{
        opacity: 0.2,
        scale: 0.5,
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
    >
      {/* turn left arrow */}
      <LeftOutlined
        className={classes.arrow}
        onClick={() => dispatch(decreaseCurrent())}
      />
      {/* CharactersList */}
      {characters.map((character) => (
        <div onClick={() => selectCharacter(character)}>
          <CharactersCard key={character.name} character={character} />
        </div>
      ))}
      {/* turn right arrow */}
      <RightOutlined
        className={classes.arrow}
        onClick={() => dispatch(increaseCurrent())}
      />
    </motion.div>
  );
};
