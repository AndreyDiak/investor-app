import { MarketList } from "../../../../components";
import { useAppSelector } from "../../../../redux/hooks";
import { MarketAssetsType, selectPortfolio } from "../../../../redux/slices";

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
            type={MarketAssetsType.PORTFOLIO}
            title={"Ваш портфель"}
            list={portfolio}
         />
      </div>
   );
};
