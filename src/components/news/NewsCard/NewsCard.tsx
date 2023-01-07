import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { checkNewsById, openModal } from "../../../redux/slices";
import { Mode, popups, NewsKinds, News } from "../../../redux/slices";

import { MoneyIconWithPrice } from "../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

import classes from "./NewsCard.module.css";

interface Props {
   news: News;
}

export const NewsCard = ({ news }: Props) => {
   const dispatch = useAppDispatch();

   const navigation = useNavigate();

   const goToMarket = () => {
      dispatch(openModal(popups.MARKET, Mode.BUY, news.stock!.id));
      navigation("/game/market");
   };

   return (
      <div className={classes.card}>
         <div
            className={classes.content}
            onClick={() => dispatch(checkNewsById(news.id))}
         >
            {/* Заголовок */}
            <div className={classes.title}>Новость / {news.date}</div>
            {/* Текст новости */}
            <div className={classes.text}>{news.text}</div>
            {/* Если денежная трата */}
            {news.money && (
               <div
                  className={classes.money}
                  style={{
                     backgroundColor:
                        news.kind === NewsKinds.NEGATIVE ? "#ac3030" : "#147804",
                  }}
               >
                  {news.kind === NewsKinds.POSITIVE ? (
                     <div>Вы получили</div>
                  ) : (
                     <div>Вы потратили</div>
                  )}
                  <MoneyIconWithPrice price={news.money} />
               </div>
            )}
            {news.stock && (
               <div
                  className={classes.stock}
                  style={{
                     backgroundColor:
                        news.kind === NewsKinds.NEGATIVE ? "#ac3030" : "#147804",
                  }}
               >
                  {news.stock.title}
               </div>
            )}
         </div>
         {news.stock && (
            <div className={classes.goTo}>
               <Button type={"default"} onClick={goToMarket}>
                  На рынок
               </Button>
            </div>
         )}
      </div>
   );
};
