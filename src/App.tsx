import { useEffect } from "react";
import {
  generateCharacters,
  selectCharacters,
} from "./features/slices/characters/characterSlice";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { selectTimeSpeed } from "./features/slices/settings/settingsSlice";

function App() {
  const timeSpeed = useAppSelector(selectTimeSpeed);
  const characters = useAppSelector(selectCharacters);

  console.log(characters);

  useEffect(() => {
    const generate = () => {
      console.log("hi");
      generateCharacters();
    };
    generate();
  }, []);
  return <div>{timeSpeed}</div>;
}

export default App;
