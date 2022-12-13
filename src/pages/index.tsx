import { AppRoutes } from "./_routes";

import "./../styles/common.css";
import "./../styles/reset.css";
import "./../styles/variables.css"

import { useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAppDispatch } from "../features/hooks";
import { setDevice } from "../features/slices";


export const App = () => {
  const dispatch = useAppDispatch();

  // проверка ширины экрана
  useEffect(() => {
    dispatch(setDevice(window.screen.width));
  }, [window.screen.width]);

  return <AppRoutes />;
};
