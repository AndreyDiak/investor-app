import { GameRoutes } from "./_routes";

import classes from "./index.module.css";
import { Header } from "../../components/Header/Header";
import { useTime } from "../../hooks/useTime";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDay, selectDay, selectTimeSpeed } from "../../redux/slices";
import React, { useEffect } from "react";

const GamePage = React.memo(() => {
  const day = useAppSelector(selectDay);

  const timeSpeed = useAppSelector(selectTimeSpeed);

  const dispatch = useAppDispatch();

  const liveProcess = () => {
    if (timeSpeed !== 0) {
      setTimeout(() => dispatch(setDay(day + 1)), timeSpeed * 250);
    }
  };

  liveProcess();

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
});

export default GamePage;
