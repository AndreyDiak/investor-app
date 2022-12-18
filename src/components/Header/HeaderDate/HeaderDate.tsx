import { useAppSelector } from "../../../redux/hooks";
import { selectDayInMonth, selectMonthName } from "../../../redux/slices";

export const HeaderDate = () => {
  const monthName = useAppSelector(selectMonthName);

  const dayInMonth = useAppSelector(selectDayInMonth);

  return (
    <div>
      {dayInMonth} {monthName}
    </div>
  );
};
