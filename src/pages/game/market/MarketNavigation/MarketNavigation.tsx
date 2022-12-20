import { Button, Select } from "antd";
import { NavLink } from "react-router-dom";
import { devices } from "../../../../models";
import { optionsMarketFilters } from "../../../../models/game/market/models";
import { useAppSelector } from "../../../../redux/hooks";
import { selectDevice } from "../../../../redux/slices";
import { marketFilters } from "../../../../redux/slices/game/market/models";

const DesktopMarketNavigation = optionsMarketFilters
  .filter(option => option.to !== marketFilters.PORTFOLIO)

export const MarketNavigation = () => {

  const device = useAppSelector(selectDevice);

  if (device === devices.DESKTOP || device === devices.LAPTOP) {
    return (
      <>
        {DesktopMarketNavigation.map((option, index) => (
          <Button key={index}>
            <NavLink to={option.to}>
              {option.label}
            </NavLink>
          </Button>
        ))}
      </>
    )
  }

  return (
    <Select defaultValue={marketFilters.STOCKS}>
      {optionsMarketFilters.map((option, index) => <Select.Option key={index}>
        <NavLink to={option.to}>{option.label}</NavLink>
      </Select.Option>)}
    </Select>
  )
}