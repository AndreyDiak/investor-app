import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { weekSpends } from "../redux/slices";

export const useWeekSpend = (day: number) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(day % 7 === 0) {
      dispatch(weekSpends());
    }
  }, [day])

  return null;
}