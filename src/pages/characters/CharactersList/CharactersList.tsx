import { Person } from "../../../features/slices/characters/typings";
import { CharactersCard } from "../CharacterCard/CharacterCard";

interface Props {
  characters: Person[];
}

import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons/lib/icons";
import classes from "./CharactersList.module.css";
import { useState } from "react";

const defaultMaxCardInRow = 4;

export const CharactersList = ({ characters }: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(defaultMaxCardInRow);

  const next = () => {
    if (endIndex === characters.length) {
      setStartIndex(0);
      setEndIndex(defaultMaxCardInRow);
    } else {
      setStartIndex((prev) => prev + 1);
      setEndIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (startIndex === 0) {
      setStartIndex(characters.length - defaultMaxCardInRow);
      setEndIndex(characters.length);
    } else {
      setStartIndex((prev) => prev - 1);
      setEndIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={classes.list}>
      <LeftOutlined className={classes.arrow} onClick={prev} />
      {characters.slice(startIndex, endIndex).map((character) => (
        <CharactersCard character={character} />
      ))}
      <RightOutlined className={classes.arrow} onClick={next} />
    </div>
  );
};
