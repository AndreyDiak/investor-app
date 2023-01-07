import { charactersPhotos } from "../../assets/characters/characters";
import { InitialPerson } from "../../redux/slices";
import { Difficulty } from "../settings/models";

export enum Expenses {
   HOME = "home",
   CAR = "car",
   CREDIT_CARD = "credit-card",
}

export const expensesTitleMap: Record<Expenses, string> = {
   home: "Дом",
   car: "Машина",
   "credit-card": "Кредитные карты",
};

export const difficultyMap = {
   0: Difficulty.EASY,
   1: Difficulty.MEDIUM,
   2: Difficulty.HARD,
};

export const defaultSalary = 600;
export const defaultStartMoney = 1000;
export const defaultSpendingsMinPaymentPercantage = 2;
export const defaultSpendingsMaxPaymentPercantage = 10;

export const defaultSpendingsPrices: Record<Expenses, number> = {
   home: 3000,
   car: 2000,
   "credit-card": 1000,
};

export const difficultySalaryCoefficient: Record<Difficulty, number> = {
   easy: 1,
   normal: 0.8,
   hard: 0.6,
};
export const difficultyStaryMoneyCoefficient: Record<Difficulty, number> = {
   easy: 0.9,
   normal: 0.7,
   hard: 0.5,
};
export const difficultySpendingsCoefficient: Record<Difficulty, number[]> = {
   easy: [0.5, 2],
   normal: [2, 3.5],
   hard: [3.5, 5],
};

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
      name: "Джимм",
      age: 25,
      work: "Режиссёр",
      photo: {
         img: charactersPhotos.JIMM.img,
         avatar: charactersPhotos.JIMM.avatar,
      },
   },
   {
      name: "Брэд",
      age: 31,
      work: "Страховщик",
      photo: {
         img: charactersPhotos.BRAD.img,
         avatar: charactersPhotos.BRAD.avatar,
      },
   },
   {
      name: "Лизи",
      age: 26,
      work: "Бухгалтер",
      photo: {
         img: charactersPhotos.LIZI.img,
         avatar: charactersPhotos.LIZI.avatar,
      },
   },
   {
      name: "Изабель",
      age: 19,
      work: "Танцовщица",
      photo: {
         img: charactersPhotos.IZABEL.img,
         avatar: charactersPhotos.IZABEL.avatar,
      },
   },
];
