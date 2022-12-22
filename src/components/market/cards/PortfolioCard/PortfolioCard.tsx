import { MyStock } from '../../../../redux/slices/game/market/stocks/typings'
import { MoneyIconWithPrice } from '../../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice';

import classes from '../cards.module.css';

interface Props {
   asset: MyStock
}

export const PortfolioCard = ({ asset }: Props) => {
   return (
      <div className={classes.card}>
         <div className={classes.title}>
            {asset.title}
         </div>
         <div className={classes.info}>
            <MoneyIconWithPrice price={asset.price} />
            {asset.id} шт
         </div>
      </div>
   )
}