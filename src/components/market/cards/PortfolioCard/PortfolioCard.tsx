import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import {
   Mode,
   popups,
   Portfolio,
   openModal,
   selectStockById,
   Conditions,
} from "../../../../redux/slices";
import { MoneyIconWithPrice } from "../../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import { ConditionBlock } from "../ConditionBlock/ConditionBlock";

import classes from "../cards.module.css";

interface Props {
   asset: Portfolio;
}

export const PortfolioCard = ({ asset }: Props) => {
   const dispatch = useAppDispatch();

   const stockFromMarket = useAppSelector(selectStockById(asset.id));

   const myPrice = useCallback(() => asset.price[0], [])();

   const marketPrice = stockFromMarket?.price[stockFromMarket.price.length - 1]!;

   let condition;

   const isProfit = myPrice < marketPrice;

   if (myPrice < marketPrice) {
      condition = Conditions.UP;
   } else {
      if (myPrice > marketPrice) {
         condition = Conditions.DOWN;
      } else {
         condition = Conditions.NOT_CHANGED;
      }
   }

   const onClickHandler = () => {
      dispatch(openModal(popups.MARKET, Mode.SELL, asset.id));
   };

   return (
      <div className={classes.card} onClick={onClickHandler}>
         <div className={classes.title}>
            {asset.title}
            <div className={classes.condition}>
               <ConditionBlock condition={condition} />
            </div>
         </div>
         <div className={classes.info}>
            <div>
               <div className={classes.price}>
                  Цена покупки: <MoneyIconWithPrice price={myPrice} />
               </div>
               <div className={classes.price}>
                  Цена продажи:{" "}
                  <MoneyIconWithPrice
                     price={marketPrice}
                     color={isProfit ? "#128900" : "#820000"}
                  />
               </div>
            </div>
            {asset.count} шт
         </div>
      </div>
   );
};
