// import styled from "styled-components";
import { Card } from "antd";
import styled from "styled-components";
import { CloseButton } from "../../../components/CloseButton/CloseButton";
import { MoneyIcon } from "../../../components/MoneyIcon/MoneyIcon";
import { Person } from "../../../features/slices/characters/typings";
import { CharacterExpenses } from "../CharacterCard/CharacterExpenses/CharacterExpenses";
import { CharacterInfo } from "../CharacterCard/CharacterInfo/CharacterInfo";

interface Props {
  character: Person;
  close: () => void;
}

export const CharacterPreview = ({ character, close }: Props) => {
  return (
    <Preview>
      <PreviewCard>
        <Close>
          <CloseButton handler={close} size={20} color="white" />
        </Close>
        <PreviewAbout>
          <Image src={character.photo.img} alt="" />
          <Info>
            <CharacterInfo
              name={character.name}
              difficulty={character.difficulty}
              salary={character.salary}
              startMoney={character.startMoney}
              avatar={character.photo.avatar}
            />

            <div>
              <Text>Ваши долги</Text>
              <CharacterExpenses expenses={character.spendings} />
              <InfoFooterText>
                % - показывает сколько процентов от{" "}
                <InfoFooterWarning>начальной суммы</InfoFooterWarning> вы выплачиваете в
                месяц по этому долгу
              </InfoFooterText>
            </div>
          </Info>
        </PreviewAbout>

        {/* <CharactersCard character={character} /> */}
        <Total>
          <TotalGain>
            Месячная выручка
            <TotalMoney>
              {character.salary} - {character.spendingsMonthPayment} ={" "}
              {character.salary - character.spendingsMonthPayment} <MoneyIcon size="s" />{" "}
            </TotalMoney>
          </TotalGain>
          <div>
            <TotalButton>Продолжить</TotalButton>
          </div>
        </Total>
      </PreviewCard>
    </Preview>
  );
};

const Preview = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewCard = styled.div`
  padding: 30px;
  position: relative;
  width: 700px;
  z-index: 100;
  border-radius: 20px;
  background-color: #006064;
`;

const PreviewAbout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Total = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #033a3b;
  border-radius: 5px;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
`;

const TotalGain = styled.p`
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 20px;

  width: max-content;
  /* border-bottom: 1px solid #029199; */
`;

const TotalMoney = styled.div`
  margin-top: 5px;
  font-size: 18px;
  display: flex;
  font-weight: 900;
  color: #88b3af;
  align-items: center;
`;

const TotalButton = styled.button`
  padding: 10px 15px;
  background-color: #006064;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: #002b2c;
  }
`;

const Close = styled.div`
  position: absolute;
  left: 10;
  top: 10;
`;

const Text = styled.p`
  margin-bottom: 10px;
  font-size: 24px;
  color: #e0fffa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
`;

const InfoFooterWarning = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;

const InfoFooterText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #a6dbd2;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
`;

const Image = styled.img`
  max-width: 300px;
  /* border-right: 0.5px solid #00897b; */
`;

const Info = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
