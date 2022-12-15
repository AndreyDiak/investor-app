import { GameRoutes } from "./_routes";

import classes from './index.module.css'
import { Header } from "../../components/Header/Header";
import { useTime } from "../../hooks/useTime";
import { useAppSelector } from "../../redux/hooks";
import { selectDay } from "../../redux/slices/game/time/timeSlice";

const GamePage = () => {

  const day = useAppSelector(selectDay);
  useTime(day); 

  return (
    <div className={classes.page}>
      {/* Header */}
      <Header />
      {/* Pages */}
      <GameRoutes />

      {/* Popups */}
    </div>
  );
};

export default GamePage;
