import styled from "styled-components";
import { MoneyIcon } from "../MoneyIcon";

interface Props {
  price: number;
  color?: string;
  gap?: number;
  fontSize?: number;
}

export const MoneyIconWithPrice = ({ price, color, gap, fontSize }: Props) => {
  return (
    <Price
      style={{
        color: color || "#fff",
        gap: gap || 5,
      }}
    >
      {price} <MoneyIcon size="s" />
    </Price>
  );
};

const Price = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 5px;
  font-weight: 900;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 18px;
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
