import { MarketList } from "../../../../components/market/MarketList/MarketList";
import { useAppSelector } from "../../../../redux/hooks";
import { selectPortfolio } from "../../../../redux/slices";
import { marketAssets } from "../../../../redux/slices/game/market/models";

export const Portfolio = () => {
   // получаем акции и облигации
   const portfolio = useAppSelector(selectPortfolio);

   return (
      <div
         style={{
            borderRight: "2px dashed #f1f1f1",
         }}
      >
         <MarketList
            type={marketAssets.PORTFOLIO}
            title={"Ваш портфель"}
            list={portfolio}
         />
      </div>
   );
};
