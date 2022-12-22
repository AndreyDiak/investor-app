import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { generateNews, monthPayment, weekSpends } from "../redux/slices";
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

      // если новый год
      if (monthIndex === 11) {
        newMonthIndex = 0;
      }
      // если февраль
      if (monthIndex === 1) {
        dispatch(generateNews()); // генерирование новости
        dispatch(checkStocks()); // обновление рынка
        dispatch(weekSpends()); // еженедельная трата
      }

      dispatch(setMonthIndex(newMonthIndex)); // новый месяц
      dispatch(setFirstDayInMonth()); // ставим первый день
      dispatch(monthPayment()); // месячная выплата зп и с других доходов
      // обновление дохода из разных источников дохода
      // обнуление месячных трат
    } else {
      if (dayInMonth === 14 || dayInMonth === 28) {
        dispatch(generateNews()) // генерирование новости
      }

      if (dayInMonth % 7 === 0 && dayInMonth !== 0) {
        dispatch(checkStocks()); // обновление рынка
        dispatch(weekSpends()); // еженедельная трата
      }

      dispatch(setDayMonth(dayInMonth + 1));
    }
  }, [day]);
};
