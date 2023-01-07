// минимальная цена акции
export const defaultStockMinPrice = 35;

// TODO : сделать настройки по уровням
// garbage medium premium (цена, доходность, разность, риск и тд...)

// минимальное количество акций
export const defaultStockCountChange = 10;

// шанс того, что цена акции не поменяется за неделю
export const defaultStockPriceNotChangeChance = 0.1;

// TODO : сделать отдельные значения для 3х типов акций
// мусорные / средние / премиум

// коеффициент изменения цены
export const stocksDiffToNormalPriceChangeMap = {
   easy: 5,
   normal: 4,
   hard: 3,
};

// во сколько стартовая цена может отличатся от начальной
export const stocksDiffToPriceMap = {
   easy: 4,
   normal: 5,
   hard: 6,
};

// шанс наличия дивидендов у
export const stocksDiffToDividendsChance = {
   easy: 0.3,
   normal: 0.2,
   hard: 0.1,
};
