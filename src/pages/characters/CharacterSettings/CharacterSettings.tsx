import styled from "styled-components";
import { Preview, PreviewCard } from "../CharacterPreview/CharacterPreview";
import CharacterSettingsDifficulty from "./CharacterSettingsDifficulty/CharacterSettingsDifficulty";
import CharacterSettingsTimeSpeed from "./CharacterSettingsTimeSpeed/CharacterSettingsTimeSpeed";

export const CharacterSettings = () => {
  return (
    <Settings>
      <CharacterSettingsTimeSpeed />
      <CharacterSettingsDifficulty />
      <SettingsButton>Начать игру</SettingsButton>
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
