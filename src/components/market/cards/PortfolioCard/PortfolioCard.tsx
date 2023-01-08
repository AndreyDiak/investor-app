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
import { MoneyIconWithPrice } from "../../../common";
import { ConditionBlock } from "../ConditionBlock/ConditionBlock";

import classes from "../cards.module.css";
import { round } from "../../../../utils";

interface Props {
   asset: Portfolio;
}

// TODO : добавить в карточку отображение дивидендов

export const PortfolioCard = ({ asset }: Props) => {
   const dispatch = useAppDispatch();

   const stockFromMarket = useAppSelector(selectStockById(asset.id))!;

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
         <div className={classes.infoPrice}>
            <p>Покупка / Продажа</p>
            <div className={classes.priceLine}>
               <MoneyIconWithPrice price={myPrice} /> /{" "}
               <MoneyIconWithPrice
                  price={marketPrice}
                  color={isProfit ? "#128900" : "#820000"}
               />
            </div>
         </div>

         {asset.isDividends && (
            <div className={classes.portfolioDividends}>
               <p>Дивиденды - </p>
               <MoneyIconWithPrice
                  price={round(
                     (marketPrice * asset.count * stockFromMarket.dividendsPercentage) /
                        100
                  )}
               />
            </div>
         )}
         <div className={classes.portfolioCount}>{asset.count} шт</div>
      </div>
   );
};
