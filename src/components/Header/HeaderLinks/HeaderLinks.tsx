import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectNotCheckedNewsLength } from "../../../redux/slices";

const links = [
  {
    label: "Расходы",
    to: "/game/spends",
  },
  {
    label: "Биржа",
    to: "/game/market",
  },
  {
    label: "Профиль",
    to: "/game/profile",
  },
  {
    label: "Банк",
    to: "/game/bank",
  },
  {
    label: "Новости",
    to: "/game/news",
    badge: true,
  },
];

import classes from "./HeaderLinks.module.css";

export const HeaderLinks = () => {

  const newsToRead = useAppSelector(selectNotCheckedNewsLength);

  return (
    <div className={classes.list}>
      {links.map((link) => (
        <div className={classes.link}>
          {!link.badge ? (
            <NavLink to={link.to}>{link.label}</NavLink>
          ) : (
            //TODO ждать релиза новостей
            <Badge count={newsToRead} overflowCount={10}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};
