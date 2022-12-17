import { NavLink, useRoutes } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCharacter } from "../../redux/slices";
import ProfilePage from "./profile";

export const GameRoutes = () => {

  const character = useAppSelector(selectCharacter)

  console.log(character)

  if (character === null) {
    return <div>
      <NavLink to='/'>
        Back to main
      </NavLink>
    </div>
  }

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
};
