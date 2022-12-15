import { assetsRisk } from './../../redux/slices/game/market/models';

export const numberToRisk = (n: number) => {
  switch(n) {
    case 4:
      return assetsRisk.HIGH;
    case 3:
      return assetsRisk.UPPER_MEDIUM;
    case 2:
      return assetsRisk.MEDIUM;
    case 1:
      return assetsRisk.LOW;
    case 0:
      return assetsRisk.SUPER_LOW;
    default:
      return assetsRisk.MEDIUM;
  }
}