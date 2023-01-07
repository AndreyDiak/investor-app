export enum Difficulty {
   EASY = "easy",
   MEDIUM = "normal",
   HARD = "hard",
}

export enum GameDuration {
   FAST = "fast",
   NORMAL = "normal",
   LONG = "long",
}

export enum Markets {
   MARKET = "market",
   REALTY = "realty",
   BUSINESS = "business",
}

export enum TimeSpeed {
   SLOW = 8,
   MEDIUM = 4,
   FAST = 2,
   STOP = 0,
}

export enum Devices {
   PHONE = "phone",
   TABLET = "tablet",
   LAPTOP = "laptop",
   DESKTOP = "desktop",
}

export const defaultDevice = Devices.LAPTOP;

// сколько карточек мы отображаем на странице выбора
export const defaultMaxCardsInARow = {
   phone: 1,
   tablet: 2,
   laptop: 4,
   desktop: 5,
};
// ширина карточки в px
export const defaultCardWidth = {
   phone: 220,
   tablet: 260,
   laptop: 280,
   desktop: 300,
};

const DifferenceWidthBetweenCardAndImage = 20; // px

export const defaultPersonImageWidth = {
   phone: defaultCardWidth.phone - DifferenceWidthBetweenCardAndImage,
   tablet: defaultCardWidth.tablet - DifferenceWidthBetweenCardAndImage,
   laptop: defaultCardWidth.laptop - DifferenceWidthBetweenCardAndImage,
   desktop: defaultCardWidth.desktop - DifferenceWidthBetweenCardAndImage,
};

export const difficultyToTitleMap = {
   all: "Все",
   easy: "Легко",
   normal: "Нормально",
   hard: "Сложно",
};

export const optionsTime = [
   {
      label: "День / 4 сек",
      value: TimeSpeed.SLOW,
   },
   {
      label: "День / 2 сек",
      value: TimeSpeed.MEDIUM,
   },
   {
      label: "День / 1 сек",
      value: TimeSpeed.FAST,
   },
];

export const optionsDuration = [
   {
      label: "Быстрая",
      value: GameDuration.FAST,
   },
   {
      label: "Нормальная",
      value: GameDuration.NORMAL,
   },
   {
      label: "Долгая",
      value: GameDuration.LONG,
   },
];

export const optionsDifficulty = [
   {
      label: "Легко",
      value: Difficulty.EASY,
   },
   {
      label: "Средне",
      value: Difficulty.MEDIUM,
   },
   {
      label: "Сложно",
      value: Difficulty.HARD,
   },
];

export const gameDurationIncomeToWin = {
   fast: 2500,
   normal: 7500,
   long: 20000,
};

// default difficulty
export const defaultDiffilculty = Difficulty.EASY;
// default timeSpeed value
export const defaultTimeSpeed = TimeSpeed.MEDIUM;
// default gameDuration
export const defaultGameDuration = GameDuration.FAST;
// default income to win
export const defaultIncomeToWin = gameDurationIncomeToWin[defaultGameDuration];

export const gameDurationAbout = {
   fast: "Быстрая игра, хорошо подходит для ознакомления с игрой.",
   normal:
      "Нормальная игры, подходит для тех кто изучил основные принципы игры и хочет попробовать что-то новенькое.",
   long: "Долгая игра, пройдите суровую проверку своих навыков, все рынки доступны.",
};

export const gameDurationMarkets = {
   fast: [Markets.MARKET],
   normal: [Markets.MARKET, Markets.REALTY],
   long: [Markets.MARKET, Markets.REALTY, Markets.BUSINESS],
};

export const marketsAbout = {
   market: "Рынок Акций и облигаций",
   realty: "Рынок недвижимости",
   business: "Свой бизнесс",
};
