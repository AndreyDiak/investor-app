import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { footerIcons } from "../../assets";
import { useAppSelector } from "../../redux/hooks";
import { selectNotCheckedNewsLength } from "../../redux/slices";

import classes from "./Footer.module.css";

const icons = [
  {
    icon: footerIcons.SPENDS,
    to: "/game/spends",
  },
  {
    icon: footerIcons.MARKET,
    to: "/game/market",
  },
  {
    icon: footerIcons.PROFILE,
    to: "/game/profile",
  },
  {
    icon: footerIcons.BANK,
    to: "/game/bank",
  },
  {
    icon: footerIcons.NEWS,
    to: "/game/news",
    badge: true,
  },
];

export const Footer = () => {

  const newsToRead = useAppSelector(selectNotCheckedNewsLength);

  return (
    <div className={classes.icons}>
      {icons.map((icon) => (
        <>
          {!icon.badge ? (
            <NavLink to={icon.to}>
              <img src={icon.icon} className={classes.iconImg} />
            </NavLink>
          ) : (
            <Badge count={newsToRead} overflowCount={10}>
              <NavLink to={icon.to}>
                <img src={icon.icon} className={classes.iconImg} />
              </NavLink>
            </Badge>
          )}
        </>
      ))}
    </div>
  );
};
