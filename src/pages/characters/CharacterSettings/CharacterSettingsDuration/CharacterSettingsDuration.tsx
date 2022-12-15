import { Radio } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { MoneyIconWithPrice } from "../../../../components/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectGameDuration, setGameDuration } from "../../../../redux/slices";
import { GameDurationType } from "../../../../redux/slices/settings/typings";
import {
  gameDurationAbout,
  gameDurationIncomeToWin,
  gameDurationMarkets,
  marketsAbout,
  optionsDuration,
} from "../../../../models";

import classes from "./../CharacterSettings.module.css";

const CharacterSettingsDuration = () => {
  const [duration, setDuration] = useState(useAppSelector(selectGameDuration));
  const dispatch = useAppDispatch();

  const onChangeHandler = (d: GameDurationType) => {
    setDuration(d);
    dispatch(setGameDuration(d));
  };

  return (
    <div className={classes.block}>
      <h4 className={classes.header}>Продолжительность игры</h4>
      <Radio.Group
        options={optionsDuration}
        onChange={(e) => onChangeHandler(e.target.value)}
        value={duration}
        optionType="button"
      />
      <About>
        <div>
          <Header>Описание</Header>
          <Text>{gameDurationAbout[duration]}</Text>
        </div>
        <div>
          <Header className="">Доступные рынки</Header>
          <MarketsList>
            {gameDurationMarkets[duration].map((market) => (
              <MarketLine>{marketsAbout[market]}</MarketLine>
            ))}
          </MarketsList>
        </div>
      </About>
      <Income>
        <p>
          Чтобы <Bold>выйграть</Bold> добейтесь дохода в
        </p>
        <div>
          <MoneyIconWithPrice price={gameDurationIncomeToWin[duration]} />
        </div>
      </Income>
    </div>
  );
};

export default CharacterSettingsDuration;

const About = styled.div`
  margin: 30px auto;
  display: flex;
  align-items: start;
  justify-content: space-between;
  text-align: start;
`;

const Header = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Text = styled.div`
  max-width: 400px;
  margin-top: 5px;
  color: var(--text-aqua);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
`;

const MarketsList = styled.div`
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: var(--aqua-dark);
`;

const MarketLine = styled.div`
  padding-bottom: 10px;
  color: var(--text-aqua);
  font-size: 14px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  border-bottom: 0.5px solid var(--text-aqua-light);
  :last-child {
    border-bottom: none;
  }
`;

const Income = styled.div`
  padding: 15px auto;
  background-color: var(--aqua-dark);
  display: flex;
  border-radius: 5px;
  color: var(--text-gray-dark);
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Bold = styled.span`
  font-weight: 700;
  text-decoration: underline;
`;
