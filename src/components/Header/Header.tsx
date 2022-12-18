import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCharacter,
  selectDay,
  selectDayInMonth,
  selectMonth,
  selectWalletBalance,
} from "../../redux/slices";
import { MoneyIconWithPrice } from "../MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import classes from "./Header.module.css";
import { HeaderAbout } from "./HeaderAbout/HeaderAbout";
import { HeaderDate } from "./HeaderDate/HeaderDate";
import { HeaderLinks } from "./HeaderLinks/HeaderLinks";
import { HeaderTimeButtons } from "./HeaderTimeButtons/HeaderTimeButtons";

export const Header = () => {
  const balance = useAppSelector(selectWalletBalance);

  return (
    <div className={classes.header}>
      {/* Character photo and name */}
      <HeaderAbout />
      {/* Change time buttons */}
      <HeaderTimeButtons />
      {/* Links to others pages */}
      <HeaderLinks />
      {/* Current time (day + month) */}
      <HeaderDate />
      {/* Player balance? */}
      <MoneyIconWithPrice price={balance} />
    </div>
  );
};
