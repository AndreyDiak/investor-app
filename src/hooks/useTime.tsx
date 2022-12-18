import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { weekSpends } from "../redux/slices";
import { checkStocks } from "../redux/slices/game/market/stocks/stocksSlice";
import {
  setDayMonth,
  selectDayInMonth,
  selectMonth,
  selectMonthIndex,
  setFirstDayInMonth,
  setMonthIndex,
} from "../redux/slices";

export const useTime = (day: number) => {
  const dispatch = useAppDispatch();

  const month = useAppSelector(selectMonth);
  const dayInMonth = useAppSelector(selectDayInMonth);
  const monthIndex = useAppSelector(selectMonthIndex);

  useEffect(() => {
    if (dayInMonth === month.duration) {
      let newMonthIndex = monthIndex + 1;

      if (monthIndex === 11) {
        newMonthIndex = 0;
      }

      dispatch(setMonthIndex(newMonthIndex));
      dispatch(setFirstDayInMonth());
      // конец месяца
      // выплата ЗП и обновление дохода от всех пассивных источников
    } else {
      if (dayInMonth === 14 || dayInMonth === 28) {
        // обновление новостей
      }

      if (dayInMonth % 7 === 0 && dayInMonth !== 0) {
        dispatch(checkStocks()); // обновление рынка
        dispatch(weekSpends()); // еженедельная трата
      }

      dispatch(setDayMonth(dayInMonth + 1));
    }
  }, [day]);
};
