import { AssetsFilter, Conditions } from "../../../../../models";
import { Assets } from "../typings";

const ConditionsCompareMap: Record<Conditions, number> = {
   down: 0,
   "not-changed": 1,
   up: 2,
};

export const filterAsset = (assets: Assets[], filter: AssetsFilter, search = "") => {
   const sorted = assets.slice(0);

   switch (filter) {
      // по кол-ву на рынке
      case AssetsFilter.COUNT:
         return sorted.sort((prev, next) => next.count - prev.count);

      // по цене
      case AssetsFilter.PRICE:
         return sorted.sort(
            (prev, next) =>
               prev.price[prev.price.length - 1] - next.price[next.price.length - 1]
         );

      // по названию
      case AssetsFilter.TITLE:
         return search === ""
            ? sorted
            : sorted.filter((asset) =>
                 asset.title.toLowerCase().includes(search.toLowerCase())
              );

      // по росту / спаду
      case AssetsFilter.CONDITION:
         return sorted.sort(
            (prev, next) =>
               ConditionsCompareMap[next.condition] - ConditionsCompareMap[prev.condition]
         );

      // по дивидендам
      case AssetsFilter.DIVIDENDS:
         return sorted.sort(
            (prev, next) => next.dividendsPercentage - prev.dividendsPercentage
         );

      // без фильтра
      case AssetsFilter.NONE:
         return sorted;

      default:
         return sorted;
   }
};
