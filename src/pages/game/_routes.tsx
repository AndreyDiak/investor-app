import React from "react";
import { useRoutes } from "react-router-dom";
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
      index: true,
      element: <ProfilePage />,
    },
  ]);

  return routes;
});
