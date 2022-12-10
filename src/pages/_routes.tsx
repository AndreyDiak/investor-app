import { useRoutes } from "react-router-dom";
import CharactersPage from "./characters";
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
  ]);

  return routes;
};
