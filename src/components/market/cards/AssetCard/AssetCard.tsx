import { Popover } from "antd";
import { useAppDispatch } from "../../../../redux/hooks";
import { Assets, openModal } from "../../../../redux/slices";
import { Mode, popups } from "../../../../redux/slices/game/modal/models";
import { MoneyIconWithPrice } from "../../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

import classes from "../cards.module.css";
import { ConditionBlock } from "../ConditionBlock/ConditionBlock";

interface Props {
   asset: Assets;
   index: number;
}

export const AssetCard = ({ asset, index }: Props) => {
   const dispatch = useAppDispatch();

   const onClickHandler = () => {
      dispatch(openModal(popups.MARKET, Mode.BUY, asset.id));
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
               <ConditionBlock condition={asset.condition} />
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
      </div>
   );
};
