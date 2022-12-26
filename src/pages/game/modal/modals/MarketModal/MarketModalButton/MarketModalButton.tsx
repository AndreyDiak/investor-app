type MarketButton = {
   text: string;
   handler: () => void;
   active: boolean;
};

import classes from "./MarketModalButton.module.css";

export const MarketModalButton = ({ text, handler, active }: MarketButton) => {
   return (
      <div
         style={{
            background: active ? "var(--aqua-market)" : "#fff",
            color: active ? "#fff" : "var(--aqua-market)",
            border: `1px solid ${active ? "#fff" : "var(--aqua-market)"}`,
         }}
         className={classes.button}
         onClick={handler}
      >
         {text}
      </div>
   );
};
