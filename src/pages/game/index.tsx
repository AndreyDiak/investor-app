import { GameRoutes } from "./_routes";

import React from "react";
import { Header } from "../../components/Header/Header";
import { useTime } from "../../hooks/useTime";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectDay, selectTimeSpeed, setDay } from "../../redux/slices";
import classes from "./index.module.css";
import { Footer } from "../../components/Footer/Footer";
import { ModalTemplate } from "./modal/Modal";

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
         {/* Popup */}
         <ModalTemplate />
         {/* Header */}
         <Header />
         {/* Pages */}
         <GameRoutes />
         {/* Footer */}
         <Footer />
      </div>
   );
});

GamePage.displayName = "GamePage";

export default GamePage;
