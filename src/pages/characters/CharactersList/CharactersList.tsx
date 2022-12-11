import { Person } from "../../../features/slices/characters/typings";
import { CharactersCard } from "../CharacterCard/CharacterCard";
import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons/lib/icons";
import classes from "./CharactersList.module.css";
import { useState } from "react";
import { useAppSelector } from "../../../features/hooks";
import { selectFilteredCharacters } from "../../../features/slices";

export const CharactersList = () => {
  const [current, setCurrent] = useState(0);
  const characters = useAppSelector(selectFilteredCharacters)

  // const next = () => {
  //   if (endIndex === characters.length) {
  //     setStartIndex(0);
  //     setEndIndex(defaultMaxCardInRow);
  //   } else {
  //     setStartIndex((prev) => prev + 1);
  //     setEndIndex((prev) => prev + 1);
  //   }
  // };

  // const prev = () => {
  //   if (startIndex === 0) {
  //     setStartIndex(characters.length - defaultMaxCardInRow);
  //     setEndIndex(characters.length);
  //   } else {
  //     setStartIndex((prev) => prev - 1);
  //     setEndIndex((prev) => prev - 1);
  //   }
  // };

  return (
    <div className={classes.list}>
      <LeftOutlined className={classes.arrow} onClick={() => {}} />
      {/* {[].map((character) => (
        <CharactersCard character={character} />
      ))} */}
      <RightOutlined className={classes.arrow} onClick={() => {}} />
    </div>
  );
};
