import { motion } from "framer-motion";
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
    <motion.div
      initial={{
        opacity: 0,
        y: 500
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
        ease: "backInOut",
      }}

    >
      <Settings>
        <CharacterSettingsTimeSpeed />
        <CharacterSettingsDifficulty />
        <CharacterSettingsDuration />
        <SettingsButton onClick={onClickHandler}>Начать игру</SettingsButton>
      </Settings>
    </motion.div>
  );
};

const Settings = styled.div`
  padding: 20px;
  text-align: center;
`;

const SettingsButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  color: var(--aqua);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  :hover {
    background-color: var(--text-gray);
  }
`;
