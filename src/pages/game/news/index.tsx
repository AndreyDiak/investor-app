import { useState } from "react";
import { NewsCard } from "../../../components/news/NewsCard/NewsCard";
import { useAppSelector } from "../../../redux/hooks";
import { selectCheckedNews, selectNotCheckedNews } from "../../../redux/slices";
import classes from "./index.module.css";

const NewsPage = () => {
   const [filter, setFilter] = useState("");

   // прочитанные новости
   const checkedNews = useAppSelector(selectCheckedNews);
   // не прочитанные новости
   const notCheckedNews = useAppSelector(selectNotCheckedNews);

   return (
      <div className={classes.page}>
         <div className={classes.list}>
            {notCheckedNews.map((news) => (
               <NewsCard news={news} />
            ))}
         </div>
      </div>
   );
};

export default NewsPage;
