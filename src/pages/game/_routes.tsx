import React from "react";
import { useRoutes } from "react-router-dom";
import NewsPage from "./news";
import ProfilePage from "./profile";

export const GameRoutes = React.memo(() => {
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <ProfilePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/news",
      element: <NewsPage />,
    },
  ]);

  return routes;
});
