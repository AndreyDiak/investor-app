import React from "react";
import { MoneyIconWithPrice } from "../MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";

interface Item {
  title: string;
  payment: number | string;
}

interface Props {
  title: string;
  footerText?: string;
  list: Item[];
  isText?: boolean;
}

import classes from "./Card.module.css";

export const Card = React.memo(({ title, list, footerText, isText = false }: Props) => {
  return (
    <div className={classes.card}>
      <div className={classes.title}>{title}</div>
      <div className={classes.list}>
        {list.map((item) => (
          <div className={classes.item}>
            <div className={classes.itemTitle}>{item.title}</div>
            {isText ? (
              <div
                style={{
                  padding: 10,
                }}
              >
                {item.payment}
              </div>
            ) : (
              <MoneyIconWithPrice price={item.payment as number} color={"black"} />
            )}
          </div>
        ))}
      </div>
      {!isText && (
        <div className={classes.footer}>
          <div className={classes.footerTitle}>{footerText}</div>
          <MoneyIconWithPrice
            price={Number(
              list.reduce((total, item) => total + (item.payment as number), 0).toFixed(1)
            )}
            color={"black"}
          />
        </div>
      )}
    </div>
  );
});
