import { MarketList } from "../../../../components/market/MarketList/MarketList"
import { marketAssets } from "../../../../redux/slices/game/market/models"

export const Portfolio = () => {

  // получаем акции и облигации

  return (
    <div style={{
      borderRight: '2px dashed #f1f1f1'
    }}>
      <MarketList type={marketAssets.PORTFOLIO} title={'Ваш портфель'} list={[]} />
    </div>
  )
}