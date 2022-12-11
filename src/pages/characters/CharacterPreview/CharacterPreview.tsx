// import styled from "styled-components";
import { useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../../../components/CloseButton/CloseButton";
import { MoneyIcon } from "../../../components/MoneyIcon/MoneyIcon";
import { useAppDispatch } from "../../../features/hooks";
import { setCharacter } from "../../../features/slices";
import { Person } from "../../../features/slices/characters/typings";
import { CharacterExpenses } from "../CharacterCard/CharacterExpenses/CharacterExpenses";
import { CharacterInfo } from "../CharacterCard/CharacterInfo/CharacterInfo";
import { CharacterSettings } from "../CharacterSettings/CharacterSettings";

interface Props {
  character: Person;
  close: () => void;
}

export const CharacterPreview = ({ character, close }: Props) => {
  const [settings, setSettings] = useState(false);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setSettings(true);
    dispatch(setCharacter(character));
  };

  return (
    <Preview>
      <PreviewCard>
        <Close>
          <CloseButton handler={close} size={20} color="white" />
        </Close>
        {!settings ? (
          <>
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
                    <InfoFooterWarning>начальной суммы</InfoFooterWarning> вы выплачиваете
                    в месяц по этому долгу
                  </InfoFooterText>
                </div>
              </Info>
            </PreviewAbout>

            <Total>
              <TotalGain>
                <Column title="Зарплата" value={character.salary} />
                <Column title="Долги" value={-character.spendingsMonthPayment} />
                <Column
                  title="Итого"
                  value={character.salary - character.spendingsMonthPayment}
                  iconEnabled
                />
              </TotalGain>
              <TotalButton onClick={handleClick}>Продолжить</TotalButton>
            </Total>
          </>
        ) : (
          <CharacterSettings />
        )}
      </PreviewCard>
    </Preview>
  );
};

interface ColumnProps {
  title: string;
  value: number;
  iconEnabled?: boolean;
}

const Column = ({ title, value, iconEnabled }: ColumnProps) => {
  return (
    <div>
      <Title
        style={{
          borderRight: iconEnabled ? "none" : "",
        }}
      >
        {title}
      </Title>
      <Money>
        <div
          style={{
            paddingTop: !iconEnabled ? "8px" : "",
          }}
        >
          {value}
        </div>
        {iconEnabled && <MoneyIcon size="s" />}
      </Money>
    </div>
  );
};

export const Preview = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreviewCard = styled.div`
  padding: 30px;
  position: relative;
  width: 700px;
  height: max-content;
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
  display: flex;
  column-gap: 20px;
`;

const Title = styled.div`
  padding-right: 20px;
  font-weight: 700;
  border-right: 1px solid #0c595e;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  :last-child {
    padding-right: 0;
    border-right: none;
  }
`;

const Money = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: #88b3af;
  font-weight: 500;
  font-size: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const TotalButton = styled.button`
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
`;

const Info = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
`;
