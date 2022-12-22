import { useAppSelector } from "../../../redux/hooks";
import { selectDayInMonth, selectMonthName } from "../../../redux/slices";

import classes from "./HeaderDate.module.css";

export const HeaderDate = () => {
  const monthName = useAppSelector(selectMonthName);

  const dayInMonth = useAppSelector(selectDayInMonth);

  return (
    <div className={classes.date}>
      {dayInMonth} {monthName}
    </div>
  );
};
