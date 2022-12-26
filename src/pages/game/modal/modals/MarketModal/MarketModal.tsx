import { useAppSelector } from "../../../../../redux/hooks";
import { selectModalInfo, selectPortfolioById } from "../../../../../redux/slices";
import { MarketModalMenu } from "./MarketModalMenu/MarketModalMenu";

import { useState } from "react";
import { MarketModalButton } from "./MarketModalButton/MarketModalButton";
import { MarketModalLine } from "./MarketModalLine/MarketModalLine";

import { Mode } from "../../../../../redux/slices/game/modal/models";
import { ModeType } from "../../../../../redux/slices/game/modal/typings";

import classes from "./MarketModal.module.css";
import { selectMarketAssetById } from "../../../../../redux/slices/game/market/marketSlice";

export const MarketModal = () => {
   const { assetId, mode } = useAppSelector(selectModalInfo);

   const [modalMode, setModalMode] = useState<ModeType>(mode);

   const portfolioAsset = useAppSelector(selectPortfolioById(assetId));

   const marketAsset = useAppSelector(selectMarketAssetById(assetId));

   const onSellHandler = () => {
      setModalMode(Mode.SELL);
   };

   const onBuyHandler = () => {
      setModalMode(Mode.BUY);
   };

   return (
      <div className={classes.modal}>
         <div className={classes.title}>
            График цены <span className={classes.bold}>{marketAsset.title}</span>
         </div>
         <div className={classes.chart}>
            <MarketModalLine price={marketAsset.price} />
         </div>
         <div className={classes.mode}>
            <span>Что вы хотите сделать?</span>
            <div className={classes.buttons}>
               {!!portfolioAsset && (
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
            asset={modalMode === Mode.BUY ? marketAsset : portfolioAsset!}
            mode={modalMode}
         />
      </div>
   );
};
