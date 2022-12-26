import React from "react";
import { Button } from "antd";
import { useState } from "react";
import { NewsCard } from "../../../components/news/NewsCard/NewsCard";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
   checkAllNews,
   selectCheckedNews,
   selectNotCheckedNews,
} from "../../../redux/slices";
import classes from "./index.module.css";

type Filter = "checked" | "not-checked";

const NewsPage = () => {
   const [filter, setFilter] = useState<Filter>("not-checked");

   const dispatch = useAppDispatch();

   // прочитанные новости
   const checkedNews = useAppSelector(selectCheckedNews);
   // не прочитанные новости
   const notCheckedNews = useAppSelector(selectNotCheckedNews);

   return (
      <div className={classes.page}>
         <div className={classes.content}>
            <div className={classes.filters}>
               <div>
                  <Button
                     style={{ marginRight: 10 }}
                     type={filter === "not-checked" ? "primary" : "default"}
                     onClick={() => setFilter("not-checked")}
                  >
                     Свежее
                  </Button>
                  <Button
                     type={filter !== "not-checked" ? "primary" : "default"}
                     onClick={() => setFilter("checked")}
                  >
                     Архив
                  </Button>
               </div>
               {filter === "not-checked" ? (
                  <Button onClick={() => dispatch(checkAllNews())}>Прочитать все</Button>
               ) : (
                  <div>Новостей в архиве - {checkedNews.length}</div>
               )}
            </div>
            <div className={classes.list}>
               {filter === "checked"
                  ? checkedNews.map((news) => <NewsCard news={news} key={news.id} />)
                  : notCheckedNews.map((news) => <NewsCard news={news} key={news.id} />)}
            </div>
         </div>
      </div>
   );
};

export default NewsPage;
