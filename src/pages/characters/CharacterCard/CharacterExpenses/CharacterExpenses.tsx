import styled from "styled-components";
import { MoneyIconWithPrice } from "../../../../components";
import { Expense } from "../../../../redux/slices";

interface Props {
   expenses: Expense[];
}

export const CharacterExpenses = ({ expenses }: Props) => {
   return (
      <ExpenseList>
         {expenses.map((expense) => (
            <ExpenseLine key={expense.title}>
               <ExpenseTitle>
                  {expense.title} ({expense.paymentPercantage}%)
               </ExpenseTitle>
               <MoneyIconWithPrice
                  price={expense.remainPrice}
                  color="var(--text-gray)"
                  gap={10}
               />
            </ExpenseLine>
         ))}
      </ExpenseList>
   );
};

const ExpenseList = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
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
   color: var(--text-aqua);
`;
