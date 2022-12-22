import { NewsEvents } from "./typings";

export enum newsTopics {
  PERSONAL = "person",
  MARKET = "market",
}

// TODO: новости про недвижимость, новости про бизнесс
export enum newsKinds {
  POSITIVE = "positive",
  NEUTRAL = "neutral",
  NEGATIVE = "negative",
}

export const personNews: NewsEvents = {
  type: newsTopics.PERSONAL,
  ableToShow: true,
  events: [
    {
      type: newsKinds.POSITIVE,
      titles: [
        { title: "Вы получили бонус на работе. Так держать!", amount: 300 },
        { title: "Разовая выплата от правительства", amount: 550 },
        { title: "Вы победели в лотерее, поздравляем!", amount: 1000 },
        { title: "Вам досталось наследство семьи! Потратьте его с умом", amount: 2500 },
        { title: "Продажа квартиры родственников!", amount: 1500 },
        { title: "Вы закрыли проект на работе и получили свою долю", amount: 250 },
        { title: "Кэшбэк по карте", amount: 200 },
        { title: "У вашего босса хорошее настроение, вы получили премию", amount: 220 },
        { title: "Подарок от друзей", amount: 750 },
      ],
    },
    {
      type: newsKinds.NEUTRAL,
      titles: [
        {
          title: "Хочешь сбежать от повседневности — не останавливайся в развитии.",
        },
        {
          title:
            "— Сегодня хороший день, чтобы умереть. — Ты всегда так говоришь. — Всегда так и есть.",
        },
        {
          title:
            "Человек, живущий обычной, размеренной жизнью, быстро становится рабом собственных привычек.",
        },
        {
          title:
            "Иногда, знаете ли, полезно съесть подгнившую селёдочную голову, чтобы оценить прелесть обычного повседневного обеда.",
        },
        {
          title: "Повседневность начинается на улице, а кончается в бесконечности.",
        },
        { title: "Взрослые -это дети, научившиеся обманывать ещё и себя." },
        { title: "Год новый, а проблемы всё те же…" },
      ],
    },
    {
      type: newsKinds.NEGATIVE,
      titles: [
        { title: "Вы проиграли в лотерее", amount: -450 },
        { title: "Онлайн казино дело такое!", amount: -1000 },
        { title: "От цен на бензин хочется плакать!", amount: -150 },
        { title: "На вас напали в переулке!", amount: -300 },
        { title: "Случайный прохожий попросил у вас денег", amount: -50 },
        {
          title: "По пути на работу вы зашли за чашечкой кофе",
          amount: -75,
        },
        { title: "На выходных вы решили себя побаловать!", amount: -500 },
        { title: "Выписка с штрафа", amount: -200 },
        { title: "Вы потеряли свою карту!", amount: -1500 },
      ],
    },
  ],
};

export const marketNews: NewsEvents = {
  type: newsTopics.MARKET,
  ableToShow: false,
  events: [
    {
      type: newsKinds.POSITIVE,
      titles: [
        {
          title: "Компания получила инвестиции, возможно, вам следует проследить за ней!",
        },
        {
          title:
            "Квартальный отчет показал хорошие результаты, доход компании показал рост!",
        },
        {
          title:
            "Компания показала хороший рост в этом квартале, рост акций не заставит себя ждать!",
        },
        {
          title:
            "Компания заняла лидирующие позиции в своём сегменте рынка, думаю вам стоит присмотреться к ней!",
        },
        {
          title:
            "Брокеры предсказывают рост доходов в следующем квартале, обратите на нее внимание!",
        },
        {
          title:
            "Компанию покупает лидер рынка, новое начальство знает, что надо делать!",
        },
      ],
    },
    {
      type: newsKinds.NEUTRAL,
      titles: [
        { title: "На рынке акций всё спокойно! Можете не волноваться!" },
        {
          title:
            "Компании S&P 500 показывают хорошие квартальный результаты, инвесторы могут быть спокойны!",
        },
        {
          title: "Вы можете спать спокойно, пока деньги работают за вас, а не вы за них",
        },
      ],
    },
    {
      type: newsKinds.NEGATIVE,
      titles: [
        { title: "Компания терпит убыдки! Скоро акции полетят вниз!" },
        {
          title:
            "Квартальный отчет показал неутешительные результаты, доход компании упал!",
        },
        {
          title:
            "В связи с последними новостями, у компании череда неудач, будьте внимательны",
        },
        {
          title:
            "Компания потеряла лидирующие места в гонке за господством на рынке, это ударит по акциям",
        },
        {
          title:
            "Брокеры предсказывают падение доходов в следующем квартале, следите внимательно",
        },
        {
          title:
            "Компания расспадается и возможно уйдёт с рынка, следите за ней внимательнее",
        },
      ],
    },
  ],
};