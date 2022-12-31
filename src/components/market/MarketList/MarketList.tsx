// обертка над любыми типами активов на рынке
// акции / облигации / опционы и тд.

import { AllAssets, Assets, MarketAssetsType, Portfolio } from "../../../redux/slices";
import { AssetCard, PortfolioCard } from "../cards";

interface Props {
   type: MarketAssetsType;
   title: string;
   list: AllAssets[]; // Bonds and others
}

import classes from "./MarketList.module.css";

export const MarketList = ({ type, title, list }: Props) => {
   return (
      <div className={classes.list}>
         {/* Название списка */}
         <div className={classes.title}>{title}</div>
         {/* Фильтры по элементам */}
         <div></div>
         {/* Список элементов */}
         <div className={classes.assets}>
            {list.map((item, index) => (
               <>
                  {type === MarketAssetsType.PORTFOLIO ? (
                     <PortfolioCard asset={item as Portfolio} key={index} />
                  ) : (
                     <AssetCard asset={item as Assets} index={index} key={index} />
                  )}
               </>
            ))}
         </div>
      </div>
   );
};
