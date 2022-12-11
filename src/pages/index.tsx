import { AppRoutes } from "./_routes";

import "./../styles/reset.css";
import "./../styles/common.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useAppDispatch } from "../features/hooks";
import { setCurrentMaxInARow } from "../features/slices";

export const App = () => {
  const dispatch = useAppDispatch();

  // проверка ширины экрана
  useEffect(() => {
    dispatch(setCurrentMaxInARow(window.screen.width));
  }, [window.screen.width]);

  return <AppRoutes />;
};
