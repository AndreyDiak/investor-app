import { FallOutlined, RiseOutlined, ShrinkOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useAppDispatch } from "../../../../redux/hooks";
import { openModal } from "../../../../redux/slices";
import { popups } from "../../../../redux/slices/game/modal/models";
import { MoneyIconWithPrice } from "../../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

import { MarketAssetsToBuy } from "../../../../redux/slices/game/market/typings";
import classes from "../cards.module.css";

interface Props {
   asset: MarketAssetsToBuy;
   index: number;
}

export const stockConditionToIconMap = {
   up: <RiseOutlined style={{ fontWeight: 700, color: "#128900", fontSize: 22 }} />,
   down: <FallOutlined style={{ fontWeight: 700, color: "#820000", fontSize: 22 }} />,
   "not-changed": (
      <ShrinkOutlined style={{ fontWeight: 700, color: "#afafaf", fontSize: 22 }} />
   ),
};

export const AssetCard = ({ asset, index }: Props) => {
   const dispatch = useAppDispatch();

   const onClickHandler = () => {
      dispatch(openModal(popups.MARKET, asset));
   };

   return (
      <div className={classes.card} onClick={onClickHandler}>
         {/* Название */}
         <div className={classes.title}>
            <div>
               {index + 1} - {asset.title}
            </div>
            {/* Состояние */}
            <Popover
               className={classes.condition}
               content={
                  <div className={classes.popover}>
                     <p>Прошлая цена</p>
                     <MoneyIconWithPrice
                        color="black"
                        price={asset.price[asset.price.length - 2]}
                     />
                  </div>
               }
            >
               {stockConditionToIconMap[asset.condition]}
            </Popover>
         </div>
         <div className={classes.info}>
            {/* Цена */}
            <MoneyIconWithPrice price={asset.price[asset.price.length - 1]} />
            {/* Возможные дивиденды? */}
            {asset.dividendsPercentage != 0 && (
               <div>Дивиденды {asset.dividendsPercentage}%</div>
            )}
         </div>
         {/* <div>
            <Button className={classes.button} onClick={onClickHandler}>
               Открыть график
            </Button>
         </div> */}
      </div>
   );
};
