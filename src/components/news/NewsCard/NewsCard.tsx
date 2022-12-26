import { newsKinds } from "../../../redux/slices/game/news/models";
import { News } from "../../../redux/slices/game/news/typings";
import { MoneyIconWithPrice } from "../../common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

import classes from './NewsCard.module.css'

interface Props {
  news: News
}

export const NewsCard = ({ news }: Props) => {
  return (
    <div className={classes.card}>
      <div className={classes.content}>
        {/* Заголовок */}
        <div className={classes.title}>Новость / {news.date}</div>
        {/* Текст новости */}
        <div className={classes.text}>
          {news.text}
        </div>
        {/* Если денежная трата */}
        {news.money && (
          <div className={classes.money} style={{
            backgroundColor: news.kind === newsKinds.NEGATIVE ?
              '#ac3030' : '#147804'
          }}>
            {
              news.kind === newsKinds.POSITIVE ? (
                <div>Вы получили</div>
              ) : (
                <div>Вы потратили</div>
              )
            }
            <MoneyIconWithPrice price={news.money} />
          </div>
        )}
        {/* TODO: добавить отображение акции и кнопку на
        переход к маркету и покупку или продажу акции */}
        {/* Если влияние на акцию */}
        {/* {
          news.stock && (
            <div className={classes.stock}>
              {news.stock}
            </div>
          )
        } */}
      </div>
    </div>
  );
};
