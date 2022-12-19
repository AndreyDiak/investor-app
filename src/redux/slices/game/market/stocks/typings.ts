import { AssetsRisk, Condition } from "../typings";

export interface Stock {
  id: string;
  title: string; // название
  count: number; // кол-во на рынке
  risk: AssetsRisk; // риск от LOW до HIGH
  price: number[]; // цена на акции
  condition: Condition; // спала цена или выросла от последней цены

  priceChangeIntervalDueToNews: number; // сколько недель цена должна расти или падать
  // если не равен 0 то у акции не должно менятся condition
  priceGrowOfFallDueToNews: Condition;

  dividendsPercentage: number; // процент девидендов с акции
  // если равен 0 - то девиндев нет

  minPrice: number; // минимальная цена акции на рынке
}

export interface MyStock {
  id: string;
  count: number; // кол-во купленных акций
  price: number; // цена по которой куплены акции
}
