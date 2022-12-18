import { Badge } from "antd";
import { NavLink } from "react-router-dom";
import { footerIcons } from "../../assets";

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
  return (
    <div className={classes.icons}>
      {icons.map((icon) => (
        <>
          {!icon.badge ? (
            <NavLink to={icon.to}>
              <img src={icon.icon} className={classes.iconImg} />
            </NavLink>
          ) : (
            //TODO ждать релиза новостей
            <Badge count={2} overflowCount={10}>
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
