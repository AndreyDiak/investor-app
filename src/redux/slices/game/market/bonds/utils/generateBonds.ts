import { generateRoundRandomValue } from "./../../../../../../utils/generateRandom";
import { companiesForBonds } from "../../../../../../models";
export const generateBonds = () => {
   // количество облигаций
   const bondsCount = generateRoundRandomValue(15) + 5;

   return Array(bondsCount).map(() => {
    
   });
};
