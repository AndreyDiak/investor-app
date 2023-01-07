import { Card, NewsCard, PersonImage } from "../../../components";
import { useAppSelector } from "../../../redux/hooks";
import {
   selectCharacter,
   selectCredits,
   selectCreditsTotal,
   selectInitialIncome,
   selectLastNews,
   selectPortfolioStocksWithDividends,
} from "../../../redux/slices";
import { round } from "../../../utils";

import classes from "./index.module.css";

const ProfilePage = () => {
   const character = useAppSelector(selectCharacter)!;

   const income = useAppSelector(selectInitialIncome);

   const stocksDividends = useAppSelector(selectPortfolioStocksWithDividends);

   const lastNews = useAppSelector(selectLastNews);

   const credits = useAppSelector(selectCredits);

   const creditsTotal = useAppSelector(selectCreditsTotal);

   const CardCredits = credits.map((spend) => ({
      title: spend.title,
      payment: round((spend.startPrice * spend.paymentPercantage) / 100, 1),
   }));

   const CardIncome = [
      {
         title: "Зарплата",
         payment: round(income - creditsTotal),
      },
      stocksDividends,
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
                  <Card title="Расходы" list={CardCredits} footerText={"Расход / мес"} />
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
                  <div>Новостей нет</div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ProfilePage;
