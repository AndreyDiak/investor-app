import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useAppDispatch } from "../../redux/hooks";
import { isCharactersCreated, setCharacters, Person } from "../../redux/slices";
import { CharacterPreview } from "./CharacterPreview/CharacterPreview";
import { CharactersList } from "./CharactersList/CharactersList";

import classes from "./index.module.css";

const CharactersPage = () => {
   const dispatch = useAppDispatch();
   const [previewCharacter, setPreviewCharacter] = useState<Person | null>(null);

   useEffect(() => {
      const generate = () => {
         dispatch(setCharacters());
      };
      generate();
   }, []);

   return (
      <div className={`${classes.wrapper} backgroundBanner defaultPage`}>
         {!isCharactersCreated ? (
            <Loader />
         ) : (
            <div>
               {previewCharacter ? (
                  <CharacterPreview
                     character={previewCharacter}
                     close={() => setPreviewCharacter(null)}
                  />
               ) : (
                  <CharactersList selectCharacter={setPreviewCharacter} />
               )}
            </div>
         )}
      </div>
   );
};

export default CharactersPage;
