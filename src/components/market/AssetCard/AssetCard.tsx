import { FallOutlined, RiseOutlined, ShrinkOutlined } from "@ant-design/icons";
import { Button, Divider, Popover } from "antd";
import { Stock } from "../../../redux/slices/game/market/stocks/typings";
import { MoneyIconWithPrice } from "../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

import classes from './AssetCard.module.css';

interface Props {
   asset: Stock;
   index: number;
}

const stockConditionToIconMap = {
   'up': <RiseOutlined style={{ fontWeight: 700, color: '#128900', fontSize: 22 }} />,
   'down': <FallOutlined style={{ fontWeight: 700, color: '#820000', fontSize: 22 }} />,
   'not-changed': <ShrinkOutlined style={{ fontWeight: 700, color: '#afafaf', fontSize: 22 }} />
}

export const AssetCard = ({ asset, index }: Props) => {
   return (
      <div className={classes.card}>
         {/* Название */}
         <div className={classes.title}>
            <div>{index + 1} - {asset.title}</div>
            {/* Состояние */}
            <Popover className={classes.condition} content={
               <div className={classes.popover}>
                  <p>Прошлая цена</p>
                  <MoneyIconWithPrice color="black" price={asset.price[asset.price.length - 2]} />
               </div>}>
               {stockConditionToIconMap[asset.condition]}
            </Popover>
         </div>
         <div className={classes.info}>
            {/* Цена */}
            <MoneyIconWithPrice price={asset.price[asset.price.length - 1]} />
            {/* Возможные дивиденды? */}
            {asset.dividendsPercentage != 0 && (
               <div>
                  Дивиденды {asset.dividendsPercentage}%
               </div>
            )}
         </div>
         <div>
            <Button className={classes.button}>
               Открыть график
            </Button>
         </div>
      </div>
   )
}