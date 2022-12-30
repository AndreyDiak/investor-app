import { MarketList } from "../../../../components/market/MarketList/MarketList";
import { useAppSelector } from "../../../../redux/hooks";
import { MarketAssetsType, selectStocks } from "../../../../redux/slices";

export const Stocks = () => {
   const stocks = useAppSelector(selectStocks);

   return (
      <div>
         <MarketList type={MarketAssetsType.STOCKS} title={"Акции"} list={stocks} />
      </div>
   );
};
