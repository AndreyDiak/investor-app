import { useEffect, useState } from "react";
import {
  selectCharacters, setCharacters,
} from "./features/slices/characters/characterSlice";
import { useAppDispatch, useAppSelector } from "./features/hooks";
import { selectTimeSpeed } from "./features/slices/settings/settingsSlice";

function App() {
  const timeSpeed = useAppSelector(selectTimeSpeed);
  const [characters] = useState(useAppSelector(selectCharacters));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const generate = () => {
      dispatch(setCharacters());
    }; 
    generate();
  }, []);
  return <div>{timeSpeed}</div>;
}

export default App;
