import { AssetsRisk, Conditions, MarketAssetsType } from "../../../../../../models";

export interface Bond {
   id: string;
   type: MarketAssetsType.BONDS;
   title: string; // название
   count: number; // кол-во на рынке
   risk: AssetsRisk; // риск от LOW до HIGH
   price: number[]; // цена на облигацию
   condition: Conditions; // спала цена или выросла от последней цены

   priceChangeIntervalDueToNews: number; // сколько недель цена должна расти или падать
   // если не равен 0 то у акции не должно менятся condition
   priceGrowOfFallDueToNews: Conditions;

   dividendsPercentage: number; // процент девидендов с облигации
   minPrice: number; // минимальная цена акции на рынке
}
