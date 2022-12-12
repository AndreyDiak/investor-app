import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CharacterSettingsDifficulty from "./CharacterSettingsDifficulty/CharacterSettingsDifficulty";
import CharacterSettingsDuration from "./CharacterSettingsDuration/CharacterSettingsDuration";
import CharacterSettingsTimeSpeed from "./CharacterSettingsTimeSpeed/CharacterSettingsTimeSpeed";

export const CharacterSettings = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate("/game");
  };

  return (
    <Settings>
      <CharacterSettingsTimeSpeed />
      <CharacterSettingsDifficulty />
      <CharacterSettingsDuration />
      <SettingsButton onClick={onClickHandler}>Начать игру</SettingsButton>
    </Settings>
  );
};

const Settings = styled.div`
  padding: 20px;
  text-align: center;
`;

const SettingsButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  /* background-color: #006064; */
  border-radius: 4px;
  border: 1px solid white;
  color: #006064;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: #c0c0c0;
  }
`;
