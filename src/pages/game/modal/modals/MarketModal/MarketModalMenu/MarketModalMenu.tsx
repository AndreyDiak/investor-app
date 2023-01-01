import { InputNumber } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MoneyIconWithPrice } from "../../../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
   buyAsset,
   closeModal,
   Portfolio,
   selectConstTimeSpeed,
   selectWalletBalance,
   sellAsset,
   setTimeSpeed,
   Assets,
   Mode,
   ModeType,
} from "../../../../../../redux/slices";
import { roundMultiply } from "../../../../../../utils/roundMultiply";

import classes from "./MarketModalMenu.module.css";
import { buttons } from "./models";

interface Props {
   asset: Assets;
   mode: ModeType;
}

// TODO : мб пробрасовать только нужные значения а не весь asset?

export const MarketModalMenu = ({ asset, mode }: Props) => {
   const balance = useAppSelector(selectWalletBalance);
   const constTimeSpeed = useAppSelector(selectConstTimeSpeed);

   const dispatch = useAppDispatch();

   const [count, setCount] = useState<number>(1); // кол-во для покупки или продаже
   // суммарная цена акций (зависит от кол-ва)
   const [price, setPrice] = useState<number>(
      count * asset.price[asset.price.length - 1]
   );
   // суммарная цена дивидендов
   const [dididends, setDividends] = useState<number>(
      roundMultiply(price * (asset.dividendsPercentage / 100))
   );
   // хватает ли нам денег
   const [isAbleToBuy, setIsAbleToBuy] = useState<boolean>(
      mode === Mode.BUY ? balance > count * price : true
   );

   // изменение кол-ва акций
   const onCountChange = useCallback(
      (value: number | string) => {
         if (typeof value === "string") {
            if (value === "min") setCount(1);
            if (value === "max") setCount(asset.count);
         } else {
            if (count + value > asset.count) return setCount(asset.count);
            if (count + value < 1) return setCount(1);
            setCount(count + value);
         }
      },
      [count, asset]
   );
   // изменение цены
   useEffect(() => {
      setPrice(roundMultiply(asset.price[asset.price.length - 1] * count));
   }, [count]);

   // проверка на возможность покупки
   useEffect(() => {
      setIsAbleToBuy(mode === Mode.BUY ? balance > price : true);
      setDividends(roundMultiply(price * (asset.dividendsPercentage / 100)));
   }, [price]);

   // обнуляем значения при смене режима
   useEffect(() => {
      setCount(1);
      setPrice(asset.price[asset.price.length - 1]);
   }, [mode]);

   const onConfirmHandler = () => {
      if (mode === Mode.BUY) {
         // покупка
         dispatch(buyAsset(asset, count, price));
      } else {
         // продажа
         dispatch(sellAsset(asset.id, asset.type, count, price));
      }
      // закрытие модалки
      dispatch(closeModal());
      // восстановление скорость игры
      dispatch(setTimeSpeed(constTimeSpeed));
   };

   return (
      <div className={classes.menu}>
         <div className={classes.content}>
            <div>
               <div className={classes.available}>
                  Доступно: <span className={classes.bigText}>{asset.count}</span>
               </div>
               <div className={classes.available}>
                  Цена: <MoneyIconWithPrice price={price} />
               </div>
               {!!asset.dividendsPercentage && (
                  <div className={`${classes.available} ${classes.dividends}`}>
                     Выплаты с дивидендов:
                     <MoneyIconWithPrice price={dididends} />
                  </div>
               )}
               <div className={classes.count}>
                  <InputNumber
                     min={0}
                     max={asset.count}
                     defaultValue={1}
                     value={count}
                     onChange={(value) => setCount(value!)}
                  />
                  <div>
                     <div className={classes.buttons}>
                        {buttons.map((btn) => (
                           <button
                              onClick={() => onCountChange(btn.value)}
                              className={classes.button}
                           >
                              {btn.label}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            <button
               className={`${classes.confirm} ${
                  isAbleToBuy ? classes.active : classes.disabled
               }`}
               disabled={!isAbleToBuy}
               onClick={onConfirmHandler}
            >
               {mode === Mode.BUY ? "Купить" : "Продать"}
            </button>
         </div>
      </div>
   );
};
