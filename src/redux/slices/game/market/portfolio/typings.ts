import { MarketAssetsToBuyType } from "../typings";

export interface Portfolio {
   id: string;
   type: MarketAssetsToBuyType;
   title: string;
   count: number; // кол-во купленных акций
   price: number[]; // цена по которой куплены акции
}
