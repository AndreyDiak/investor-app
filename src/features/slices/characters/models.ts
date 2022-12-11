import { difficulty } from "../settings/models";
import { charactersPhotos } from "../../../assets/characters/characters";
import {
  DefaultExpensesPrices,
  DifficultyCoefficientMapType,
  ExpenseTitleMapType,
  InitialPerson,
} from "./typings";

export enum Expenses {
  HOME = "home",
  CAR = "car",
  CREDIT_CARD = "credit-card",
}

export const expensesTitleMap: ExpenseTitleMapType = {
  home: "Дом",
  car: "Машина",
  "credit-card": "Кредитные карты",
};

export const difficultyMap = {
  0: difficulty.EASY,
  1: difficulty.MEDIUM,
  2: difficulty.HARD,
};

export const defaultSalary = 600;
export const defaultStartMoney = 1000;
export const defaultSpendingsPrices: DefaultExpensesPrices = {
  home: 3000,
  car: 2000,
  "credit-card": 1000,
};

export const defaultSpendingsMinPaymentPercantage = 2;
export const defaultSpendingsMaxPaymentPercantage = 10;

export const difficultySalaryCoefficient: DifficultyCoefficientMapType = {
  easy: 0.4,
  normal: 0.6,
  hard: 0.8,
};
export const difficultyStaryMoneyCoefficient: DifficultyCoefficientMapType = {
  easy: 0.4,
  normal: 0.6,
  hard: 0.8,
};
export const difficultySpendingsCoefficient: DifficultyCoefficientMapType = {
  easy: 3,
  normal: 4,
  hard: 5,
};

// сколько карточек мы отображаем на странице выбора
export enum defaultMaxCardsInARow {
  PHONE = 1,
  TABLET = 2,
  LAPTOP = 3,
  DESKTOP = 4,
}

// only 4 characters available now...
export const initialCharacters: InitialPerson[] = [
  {
    name: "Эдди",
    age: 28,
    work: "Маркетолог",
    photo: {
      img: charactersPhotos.EDDIE.img,
      avatar: charactersPhotos.EDDIE.avatar,
    },
  },
  {
    name: "Макс",
    age: 24,
    work: "Менеджер",
    photo: {
      img: charactersPhotos.MAX.img,
      avatar: charactersPhotos.MAX.avatar,
    },
  },
  {
    name: "Билл",
    age: 19,
    work: "Разработчик",
    photo: {
      img: charactersPhotos.BILL.img,
      avatar: charactersPhotos.BILL.avatar,
    },
  },
  {
    name: "Кейт",
    age: 23,
    work: "Переводчик",
    photo: {
      img: charactersPhotos.KATE.img,
      avatar: charactersPhotos.KATE.avatar,
    },
  },
  {
    name: "Фред",
    age: 21,
    work: "Официант",
    photo: {
      img: charactersPhotos.FRED.img,
      avatar: charactersPhotos.FRED.avatar,
    },
  },
  {
    name: "Джимми",
    age: 25,
    work: "Режиссёр",
    photo: {
      img: charactersPhotos.JIMM.img,
      avatar: charactersPhotos.JIMM.avatar,
    },
  },
];
