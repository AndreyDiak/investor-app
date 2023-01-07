import { Card } from "antd";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../redux/hooks";
import { selectCardWidth, Person } from "../../../redux/slices";

interface Props {
   character: Person;
}

import classes from "./CharacterCard.module.css";
import { CharacterInfo } from "./CharacterInfo/CharacterInfo";

export const CharactersCard = ({ character }: Props) => {
   const width = useAppSelector(selectCardWidth);

   return (
      <Card
         hoverable
         style={{ width }}
         cover={
            <motion.img
               src={character.photo.img}
               initial={{ opacity: 0.3, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{
                  duration: 0.5,
                  ease: "easeInOut",
               }}
            />
         }
         className={classes.card}
         onClick={() => {
            console.log(character);
         }}
      >
         <Card.Meta
            title={
               <motion.div
                  initial={{
                     opacity: 0.3,
                     x: -100,
                     y: 100,
                     rotate: -50,
                     z: 10,
                  }}
                  animate={{
                     opacity: 1,
                     x: 0,
                     y: 0,
                     rotate: 0,
                  }}
                  transition={{
                     duration: 0.7,
                     ease: "backOut",
                  }}
               >
                  <CharacterInfo
                     name={character.name}
                     difficulty={character.difficulty}
                     salary={character.salary}
                     startMoney={character.startMoney}
                     avatar={character.photo.avatar}
                  />
               </motion.div>
            }
            description={<div className={classes.description}>{character.work}</div>}
            className={classes.meta}
         />
      </Card>
   );
};
