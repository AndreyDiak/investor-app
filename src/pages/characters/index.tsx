import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { isCharactersCreated, setCharacters } from "../../features/slices";
import { CharactersList } from "./CharactersList/CharactersList";

import classes from "./index.module.css";

const CharactersPage = () => {
  const dispatch = useAppDispatch();
  const isCharctersCreated = useAppSelector(isCharactersCreated);

  useEffect(() => {
    const generate = () => {
      dispatch(setCharacters());
    };
    generate();
  }, []);

  if (!isCharctersCreated) {
    return <div>Loading</div>;
  }

  return (
    <div className={`${classes.wrapper} backgroundBanner defaultPage`}>
      <CharactersList />
    </div>
  );
};

export default CharactersPage;
