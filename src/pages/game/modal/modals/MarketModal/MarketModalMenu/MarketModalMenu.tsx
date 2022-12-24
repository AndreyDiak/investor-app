import { InputNumber } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MoneyIconWithPrice } from "../../../../../../components/common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
   buyAsset,
   closeModal,
   selectConstTimeSpeed,
   selectWalletBalance,
   sellAsset,
   setTimeSpeed,
} from "../../../../../../redux/slices";
import {
   AssetsType,
   MarketAssetsToBuy,
} from "../../../../../../redux/slices/game/market/typings";
import { Mode, ModeType } from "../MarketModal";

import classes from "./MarketModalMenu.module.css";

interface Props {
   asset: AssetsType;
   mode: ModeType;
}

const values = [
   {
      label: "мин",
      value: "min",
   },
   {
      label: "-1",
      value: -1,
   },
   {
      label: "-5",
      value: -5,
   },
   {
      label: "-10",
      value: -10,
   },
   {
      label: "+10",
      value: 10,
   },
   {
      label: "+5",
      value: 5,
   },
   {
      label: "+1",
      value: 1,
   },
   {
      label: "макс",
      value: "max",
   },
];

// TODO : не пробрасывать весь ассет
// так как появляется баг с количеством
// пробрасовать отдельно
// мб можно обойтись id type count last price?

export const MarketModalMenu = ({ asset, mode }: Props) => {
   const balance = useAppSelector(selectWalletBalance);
   const constTimeSpeed = useAppSelector(selectConstTimeSpeed);

   const dispatch = useAppDispatch();

   const [count, setCount] = useState<number>(1); // кол-во для покупки или продаже
   const [price, setPrice] = useState<number>(
      count * asset.price[asset.price.length - 1]
   ); // суммарная цена (зависит от кол-ва)
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
      [count]
   );
   // изменение цены
   useEffect(() => {
      setPrice(Number((asset.price[asset.price.length - 1] * count).toFixed(1)));
   }, [count]);

   // проверка на возможность покупки
   useEffect(() => {
      setIsAbleToBuy(mode === Mode.BUY ? balance > price : true);
   }, [price]);

   // обнуляем значения при смене режима
   useEffect(() => {
      setCount(1);
      setPrice(asset.price[asset.price.length - 1]);
   }, [mode]);

   const onConfirmHandler = () => {
      if (mode === Mode.BUY) {
         // покупка
         dispatch(buyAsset(asset as MarketAssetsToBuy, count, price));
      } else {
         dispatch(sellAsset(asset, count, price));
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
                        {values.map((btn) => (
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
