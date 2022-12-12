export enum difficulty {
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

export const difficultyToTitleMap = {
  easy: "Легко",
  normal: "Нормально",
  hard: "Сложно",
};

export enum timeSpeed {
  SLOW = 8,
  MEDIUM = 4,
  FAST = 2,
  STOP = 0,
}

// default diff value
// export const defaultDiffilculty = difficulty.EASY;

export const optionsTime = [
  {
    label: "День / 4 сек",
    value: timeSpeed.SLOW,
  },
  {
    label: "День / 2 сек",
    value: timeSpeed.MEDIUM,
  },
  {
    label: "День / 1 сек",
    value: timeSpeed.FAST,
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
    value: difficulty.EASY,
  },
  {
    label: "Средне",
    value: difficulty.MEDIUM,
  },
  {
    label: "Сложно",
    value: difficulty.HARD,
  },
];

export const gameDurationIncomeToWin = {
  fast: 2500,
  normal: 7500,
  long: 20000,
};

// default difficulty
export const defaultDiffilculty = difficulty.EASY;
// default timeSpeed value
export const defaultTimeSpeed = timeSpeed.MEDIUM;
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
