import money from '../../../assets/money/money_3.png'

import classes from "./MoneyIcon.module.css";

interface Props {
  size?: "s" | "m" | "l" | "xl" | "loader";
}

const sizeToWidthMap = {
  s: 35,
  m: 40,
  l: 45,
  xl: 50,
  loader: 100,
};

const defaultSize = "m";

export const MoneyIcon = ({ size }: Props) => {
  return (
    <img
      src={money}
      alt=""
      style={{
        width: (size && sizeToWidthMap[size]) || sizeToWidthMap[defaultSize],
      }}
    />
  );
};
