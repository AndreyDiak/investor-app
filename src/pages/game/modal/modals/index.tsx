import React from "react";
import { ReactNode } from "react";
import { PopupType } from "../../../../redux/slices/game/modal/typings";
import { MarketModal } from "./MarketModal/MarketModal";

type Modals = {
   [modal in PopupType]: ReactNode;
};

export const modals: Modals = {
   market: <MarketModal />,
   history: <MarketModal />,
   business: <MarketModal />,
   realty: <div></div>,
};
