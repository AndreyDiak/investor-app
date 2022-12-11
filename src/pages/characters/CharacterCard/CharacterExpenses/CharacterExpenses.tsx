import styled from "styled-components";
import { MoneyIcon } from "../../../../components/MoneyIcon/MoneyIcon";
import { Expense } from "../../../../features/slices/characters/typings";

interface Props {
  expenses: Expense[];
}

export const CharacterExpenses = ({ expenses }: Props) => {
  return (
    <ExpenseList>
      {expenses.map((expense) => (
        <ExpenseLine>
          <ExpenseTitle>
            {expense.title} ({expense.paymentPercantage}%)
          </ExpenseTitle>
          <ExpensePrice>
            {expense.remainPrice}
            <MoneyIcon size="s" />
          </ExpensePrice>
        </ExpenseLine>
      ))}
    </ExpenseList>
  );
};

const ExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* row-gap: 10px; */
`;

const ExpenseLine = styled.div`
  padding-bottom: 10px;
  width: 95%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  border-bottom: 0.5px solid #83c6cf;
  :last-child {
    border-bottom: none;
    margin: 0;
  }
`;

const ExpenseTitle = styled.p`
  font-weight: 700;
  color: #88b3af;
`;

const ExpensePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  font-size: 20px;
  color: #dddddd;
`;
