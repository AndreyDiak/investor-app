import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { weekSpends } from "../redux/slices";
import { checkStocks } from "../redux/slices/game/market/stocks/stocksSlice";
import { selectDayInMonth, selectMonth, selectMonthIndex, setDayInMonth, setMonthIndex } from "../redux/slices/game/time/timeSlice"

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
      dispatch(setDayInMonth(1))

      // конец месяца
      // выплата ЗП и обновление дохода от всех пассивных источников
    } else {


      if (dayInMonth === 14 || dayInMonth === 28) {
        // обновление новостей
      }

      if (dayInMonth % 7 === 0) {
        checkStocks() // обновление рынка
        weekSpends() // еженедельная трата
      }

      dispatch(setDayInMonth(dayInMonth + 1));
    }



  }, [day])
}