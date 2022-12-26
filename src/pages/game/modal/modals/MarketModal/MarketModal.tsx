import { useAppSelector } from "../../../../../redux/hooks";
import {
   selectAsset,
   selectPortfolioById,
   selectStockById,
} from "../../../../../redux/slices";
import { MarketModalMenu } from "./MarketModalMenu/MarketModalMenu";

import { useState } from "react";
import { MarketModalButton } from "./MarketModalButton/MarketModalButton";
import { MarketModalLine } from "./MarketModalLine/MarketModalLine";

import { marketAssets } from "../../../../../redux/slices/game/market/models";

import { ModeType } from "../../../../../redux/slices/game/modal/typings";
import { Mode } from "../../../../../redux/slices/game/modal/models";

import classes from "./MarketModal.module.css";

export const MarketModal = () => {
   const asset = useAppSelector(selectAsset);
   const myAsset = useAppSelector(selectPortfolioById(asset!.id));

   const marketAsset =
      asset?.type === marketAssets.STOCKS
         ? useAppSelector(selectStockById(asset.id))
         : null;

   const isInMyPortfolio = !!myAsset;

   const [mode, setMode] = useState<ModeType>(Mode.BUY);

   const onSellHandler = () => {
      setMode(Mode.SELL);
   };

   const onBuyHandler = () => {
      setMode(Mode.BUY);
   };

   return (
      <div className={classes.modal}>
         <div className={classes.title}>
            График цены <span className={classes.bold}>{asset?.title}</span>
         </div>
         <div className={classes.chart}>
            <MarketModalLine price={marketAsset!.price} />
         </div>
         <div className={classes.mode}>
            <span>Что вы хотите сделать?</span>
            <div className={classes.buttons}>
               {isInMyPortfolio && (
                  <MarketModalButton
                     text="Продать"
                     active={mode === Mode.SELL}
                     handler={onSellHandler}
                  />
               )}
               <MarketModalButton
                  text="Купить"
                  active={mode === Mode.BUY}
                  handler={onBuyHandler}
               />
            </div>
         </div>
         <MarketModalMenu
            asset={mode === Mode.BUY ? marketAsset! : myAsset!}
            mode={mode}
         />
      </div>
   );
};
