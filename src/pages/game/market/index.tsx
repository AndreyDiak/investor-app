import { MarketNavigation } from "./MarketNavigation/MarketNavigation"
import { MarketRoutes } from "./_routes"

import classes from './index.module.css'

export const MarketPage = () => {
  return (
    <div className={classes.page}>
      <div className={classes.content}>
        {/* Навигация */}
        <div className={classes.navigation}>
          <MarketNavigation />
        </div>
        {/* Портфель / активы */}
        <div className={classes.assets}>
          <MarketRoutes />
        </div>
      </div>
    </div>
  )
}