import { Card } from "../../../components/profile/Card/Card";
import { NewsCard } from "../../../components/news/NewsCard/NewsCard";
import { PersonImage } from "../../../components/common/PersonImage/PersonImage";
import { useAppSelector } from "../../../redux/hooks";
import { selectCharacter, selectLastNews, selectTotalIncome } from "../../../redux/slices";

import classes from "./index.module.css";

const ProfilePage = () => {
  const character = useAppSelector(selectCharacter)!;

  const income = useAppSelector(selectTotalIncome);

  const lastNews = useAppSelector(selectLastNews);

  const CardExpenses = character.spendings.map((spend) => ({
    title: spend.title,
    payment: Number(((spend.startPrice * spend.paymentPercantage) / 100).toFixed(1)),
  }));

  const CardIncome = [
    {
      title: "Зарплата",
      payment: income,
    },
  ];

  const CardBio = [
    {
      title: "Имя",
      payment: character.name,
    },
    {
      title: "Возраст",
      payment: character.age,
    },
    {
      title: "Работа",
      payment: character.work,
    },
    {
      title: "Кол-во детей",
      payment: 0,
    },
  ];

  return (
    <div className={classes.page}>
      <div className={classes.content}>
        <div className={classes.personImage}>
          <PersonImage image={character?.photo.img} size={400} />
        </div>
        <div className={classes.cards}>
          {/* character income */}
          <div>
            <Card title="Доходы" list={CardIncome} footerText={"Доход / мес"} />
          </div>
          {/* character expenses*/}
          <div>
            <Card title="Расходы" list={CardExpenses} footerText={"Расход / мес"} />
          </div>
          {/* character bio */}
          <div>
            <Card title="Био" list={CardBio} isText />
          </div>
          {/* last news + close button? */}
          {lastNews ? (
            <div>
              <NewsCard news={lastNews} />
            </div>
          ) : (
            <div>
              Новостей нет
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
