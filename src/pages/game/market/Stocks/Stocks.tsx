import { MarketList } from "../../../../components/market/MarketList/MarketList"
import { useAppSelector } from "../../../../redux/hooks"
import { selectStocks } from "../../../../redux/slices"
import { marketAssets } from "../../../../redux/slices/game/market/models"

export const Stocks = () => {

  const stocks = useAppSelector(selectStocks)

  return (
    <div>
      <MarketList type={marketAssets.STOCKS} title={"Акции"} list={stocks} />
    </div>
  )
}