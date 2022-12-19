import { newsTopics, newsKinds } from "./models";

export type NewsTopics = newsTopics.MARKET | newsTopics.PERSONAL;

export type NewsKinds = newsKinds.NEGATIVE | newsKinds.NEUTRAL | newsKinds.POSITIVE;

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
