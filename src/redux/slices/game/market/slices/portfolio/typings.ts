import { MarketAssetsType } from "../../../../../../models";

export interface Portfolio {
   id: string;
   type: MarketAssetsType.PORTFOLIO;
   title: string;
   count: number; // кол-во купленных акций
   price: number[]; // цена по которой куплены акции
   dividends: number; // количество выплачиваемых дивидендов
}
