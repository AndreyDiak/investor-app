import { RightOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons/lib/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
   decreaseCurrent,
   Difficulty,
   increaseCurrent,
   selectCharactersWithMaxInARow,
   selectMaxCardsInARow,
} from "../../../redux/slices";
import { CharactersCard } from "../CharacterCard/CharacterCard";

import { motion } from "framer-motion";

import classes from "./CharactersList.module.css";
import { Person } from "../../../redux/slices/characters/typings";
import { memo, useState } from "react";
import { DifficultyCard } from "../../../components";

interface Props {
   selectCharacter: (character: Person) => void;
}

export type CharactersListFilter = "all" | Difficulty;

export const CharactersList = memo(({ selectCharacter }: Props) => {
   const dispatch = useAppDispatch();
   const [filter, setFilter] = useState<CharactersListFilter>("all");
   const characters = useAppSelector(selectCharactersWithMaxInARow(filter));

   console.log(characters);
   console.log({ filter });

   const currentMaxInARow = useAppSelector(selectMaxCardsInARow);
   return (
      <div className={classes.content}>
         <div className={classes.menu}>
            {/* MENU */}
            <div className={classes.item} onClick={() => setFilter("all")}>
               <DifficultyCard difficulty={"all"} />
            </div>
            <div className={classes.item} onClick={() => setFilter(Difficulty.EASY)}>
               <DifficultyCard difficulty={Difficulty.EASY} />
            </div>
            <div className={classes.item} onClick={() => setFilter(Difficulty.MEDIUM)}>
               <DifficultyCard difficulty={Difficulty.MEDIUM} />
            </div>
            <div className={classes.item} onClick={() => setFilter(Difficulty.HARD)}>
               <DifficultyCard difficulty={Difficulty.HARD} />
            </div>
         </div>
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
            {characters.length >= currentMaxInARow && (
               //* turn left arrow
               <LeftOutlined
                  className={classes.arrow}
                  onClick={() => dispatch(decreaseCurrent())}
               />
            )}

            {/* CharactersList */}
            {characters.map((character) => (
               <div key={character.name} onClick={() => selectCharacter(character)}>
                  <CharactersCard character={character} />
               </div>
            ))}
            {characters.length >= currentMaxInARow && (
               //* turn right arrow
               <RightOutlined
                  className={classes.arrow}
                  onClick={() => dispatch(increaseCurrent())}
               />
            )}
         </motion.div>
      </div>
   );
});
