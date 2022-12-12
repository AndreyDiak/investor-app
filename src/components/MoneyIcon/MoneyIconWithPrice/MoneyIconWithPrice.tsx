import styled from "styled-components";
import { MoneyIcon } from "../MoneyIcon";

interface Props {
  price: number;
  color?: string;
  gap?: number;
}

export const MoneyIconWithPrice = ({ price, color, gap }: Props) => {
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
  gap: 5px;
  font-size: 20px;
  font-weight: 900;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;
