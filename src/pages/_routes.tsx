import { useRoutes } from "react-router-dom";
import CharactersPage from "./characters";
import GamePage from "./game";
import MenuPage from "./menu";

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <MenuPage />,
    },
    {
      path: "/characters",
      element: <CharactersPage />,
    },
    {
      path: "/game/*",
      element: <GamePage />,
    },
  ]);

  return routes;
};
