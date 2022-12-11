import styled from "styled-components";
import { difficultyToTitleMap } from "../../features/slices/settings/models";
import { DifficultyType } from "../../features/slices/settings/typings";

interface Props {
  difficulty: DifficultyType;
}

const difficultyColors = {
  easy: "#2e7d32",
  normal: "#f9a825",
  hard: "#bf360c",
};

import classes from "./DifficultyCard.module.css";

export const DifficultyCard = ({ difficulty }: Props) => {
  return (
    <div
      className={classes.card}
      style={{
        backgroundColor: difficultyColors[difficulty],
      }}
    >
      <Text>{difficultyToTitleMap[difficulty]}</Text>
    </div>
  );
};

const Text = styled.p`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
`;
