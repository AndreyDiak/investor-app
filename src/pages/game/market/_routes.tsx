import { useRoutes } from "react-router-dom";
import { Devices } from "../../../models";
import { useAppSelector } from "../../../redux/hooks";
import { selectDevice } from "../../../redux/slices";
import { Bonds } from "./Bonds/Bonds";
import { Portfolio } from "./Portfolio/Portfolio";
import { Stocks } from "./Stocks/Stocks";

export const MarketRoutes = () => {
   const device = useAppSelector(selectDevice);

   const routes = useRoutes([
      {
         path: "",
         index: true,
         element: <Stocks />,
      },
      {
         path: "stocks",
         element: <Stocks />,
      },
      {
         path: "bonds",
         element: <Bonds />,
      },
      {
         path: "portfolio",
         element: <Bonds />,
      },
   ]);

   // если мы на ПК или ноуте то всегда отображаем портфель игрока
   if (device === Devices.DESKTOP || device === Devices.LAPTOP) {
      return (
         <>
            <Portfolio />
            {routes}
         </>
      );
   }
   // если мы на телефоне или планшете то рендрим что-то одно
   return routes;
};
