import { MarketNavigation } from "./MarketNavigation/MarketNavigation"
import { MarketRoutes } from "./_routes"

export const MarketPage = () => {
  return (
    <div>
      <div>
        {/* Навигация */}
        <div>
          <MarketNavigation />
        </div>
        {/* Портфель / активы */}
        <div>
          <MarketRoutes />
        </div>
      </div>
    </div>
  )
}