import { GameRoutes } from "./_routes";

import classes from './index.module.css'
import { Header } from "../../components/Header/Header";

const GamePage = () => {
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
