import { useState } from "react";
import { MarketList } from "../../../../components";
import { useAppSelector } from "../../../../redux/hooks";
import {
   AssetsFilter,
   MarketAssetsType,
   selectFilteredStocks,
} from "../../../../redux/slices";
import { MarketFilter } from "../MarketFilter/MarketFilter";

export const Stocks = () => {
   const [filter, setFilter] = useState<AssetsFilter>(AssetsFilter.NONE);
   const [search, setSearch] = useState<string>("");
   const [reverse, setReverse] = useState<boolean>(false);

   const stocks = useAppSelector(selectFilteredStocks(filter, search));

   return (
      <div>
         <MarketFilter
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            reverse={reverse}
            setReverse={setReverse}
         />
         <MarketList
            type={MarketAssetsType.STOCKS}
            title={"Акции"}
            list={!reverse ? stocks : stocks.reverse()}
         />
      </div>
   );
};
