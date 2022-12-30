import { Button } from "antd";
import { NavLink } from "react-router-dom";
import classes from "./index.module.css";

const MenuPage = () => {
   return (
      <div className={`${classes.wrapper} backgroundBanner defaultPage`}>
         <div className={classes.box}>
            <div className={classes.header}>
               <h3 className={classes.title}>#ЯИнвестор</h3>
               <div>
                  <small className={classes.version}>ВЕРСИЯ 3.0</small>
               </div>
            </div>
            <Button type="default" data-test="start-button">
               <NavLink to="/characters">Начать игру</NavLink>
            </Button>
         </div>
      </div>
   );
};

export default MenuPage;
