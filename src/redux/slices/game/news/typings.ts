import { NewsTopics, NewsKinds } from "./models";

export interface NewsEvents {
   type: NewsTopics;
   ableToShow: boolean;
   events: {
      type: NewsKinds;
      titles: {
         title: string;
         amount?: number;
      }[];
   }[];
}

export interface News {
   id: string;
   date: string;
   kind: NewsKinds;
   type: NewsTopics;
   text: string;
   stock: {
      title: string;
      id: string;
   } | null;
   money: null | number;
   isChecked: boolean;
}
