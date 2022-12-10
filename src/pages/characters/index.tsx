import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { selectCharacters, setCharacters } from "../../features/slices";
import { CharactersList } from "./CharactersList/CharactersList";

import classes from "./index.module.css";

const CharactersPage = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);

  useEffect(() => {
    const generate = () => {
      dispatch(setCharacters());
    };
    generate();
  }, []);

  if (characters.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div className={`${classes.wrapper} backgroundBanner defaultPage`}>
      <CharactersList characters={characters} />
    </div>
  );
};

export default CharactersPage;
