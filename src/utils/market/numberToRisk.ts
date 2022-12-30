import { AssetsRisk } from "./../../redux/slices";

export const numberToRisk = (n: number) => {
   switch (n) {
      case 4:
         return AssetsRisk.HIGH;
      case 3:
         return AssetsRisk.UPPER_MEDIUM;
      case 2:
         return AssetsRisk.MEDIUM;
      case 1:
         return AssetsRisk.LOW;
      case 0:
         return AssetsRisk.SUPER_LOW;
      default:
         return AssetsRisk.MEDIUM;
   }
};
