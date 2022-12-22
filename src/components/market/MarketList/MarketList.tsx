// обертка над любыми типами активов на рынке
// акции / облигации / опционы и тд.

import { marketAssets } from "../../../redux/slices/game/market/models";
import { Stock } from "../../../redux/slices/game/market/stocks/typings";
import { MarketAssets } from "../../../redux/slices/game/market/typings"
import { AssetCard } from "../cards/AssetCard/AssetCard";

interface Props {
  type: MarketAssets;
  title: string;
  list: Stock[]; // Bonds and others
}

import classes from './MarketList.module.css';

export const MarketList = ({ type, title, list }: Props) => {
  return (
    <div className={classes.list}>
      {/* Название списка */}
      <div className={classes.title}>
        {title}
      </div>
      {/* Фильтры по элементам */}
      <div>

      </div>
      {/* Список элементов */}
      <div className={classes.assets}>
        {list.map((item, index) =>
          <AssetCard asset={item} index={index} key={index} />
        )}
      </div>
    </div>
  )
}
