import { Button, Select } from "antd";
import { NavLink } from "react-router-dom";

import { optionsMarketFilters, Devices } from "../../../../models";
import { useAppSelector } from "../../../../redux/hooks";
import { MarketAssetsType, selectDevice } from "../../../../redux/slices";

const DesktopMarketNavigation = optionsMarketFilters.filter(
   (option) => option.to !== MarketAssetsType.PORTFOLIO
);

export const MarketNavigation = () => {
   const device = useAppSelector(selectDevice);

   if (device === Devices.DESKTOP || device === Devices.LAPTOP) {
      return (
         <>
            {DesktopMarketNavigation.map((option, index) => (
               <Button key={index}>
                  <NavLink to={option.to}>{option.label}</NavLink>
               </Button>
            ))}
         </>
      );
   }

   return (
      <Select defaultValue={MarketAssetsType.STOCKS}>
         {optionsMarketFilters.map((option, index) => (
            <Select.Option key={index}>
               <NavLink to={option.to}>{option.label}</NavLink>
            </Select.Option>
         ))}
      </Select>
   );
};
