import {
   AssetsRisk,
   Conditions,
   MarketAssetsType,
} from "../../../../../../models/game/market/models";

export interface Stock {
   id: string;
   type: MarketAssetsType;
   title: string; // название
   count: number; // кол-во на рынке
   risk: AssetsRisk; // риск от LOW до HIGH
   price: number[]; // цена на акции
   condition: Conditions; // спала цена или выросла от последней цены

   priceChangeIntervalDueToNews: number; // сколько недель цена должна расти или падать
   // если не равен 0 то у акции не должно менятся condition
   priceGrowOfFallDueToNews: Conditions;

   dividendsPercentage: number; // процент девидендов с акции
   // если равен 0 - то девиндев нет

   minPrice: number; // минимальная цена акции на рынке
}
