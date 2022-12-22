import React from "react";
import { useRoutes } from "react-router-dom";
import { MarketPage } from "./market";
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
    {
      path: '/market/*',
      element: <MarketPage />
    }
  ]);

  return routes;
});
