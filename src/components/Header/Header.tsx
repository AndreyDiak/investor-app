import { useAppSelector } from "../../redux/hooks";
import { selectWalletBalance } from "../../redux/slices";
import { MoneyIconWithPrice } from "../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import { HeaderAbout } from "./HeaderAbout/HeaderAbout";
import { HeaderDate } from "./HeaderDate/HeaderDate";
import { HeaderLinks } from "./HeaderLinks/HeaderLinks";
import { HeaderTimeButtons } from "./HeaderTimeButtons/HeaderTimeButtons";

import classes from "./Header.module.css";

export const Header = () => {
  const balance = useAppSelector(selectWalletBalance);

  return (
    <div className={classes.header}>
      <div className={classes.headerAbout}>
        {/* Character photo and name */}
        <HeaderAbout />
        {/* Change time buttons */}
        <HeaderTimeButtons />
      </div>
      {/* Links to others pages */}
      <HeaderLinks />
      {/* Current time (day + month) */}
      <div className={classes.headerInfo}>
        <HeaderDate />
        {/* Player balance? */}
        <MoneyIconWithPrice price={balance} fontSize={24} />
      </div>
    </div>
  );
};
