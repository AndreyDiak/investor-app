import { Avatar } from "antd";
import { DifficultyCard } from "../../../../components/DifficultyCard/DifficultyCard";
import { MoneyIcon } from "../../../../components/MoneyIcon/MoneyIcon";
import { DifficultyType } from "../../../../features/slices/settings/typings";

import classes from "./CharacterInfo.module.css";

interface Props {
  name: string;
  difficulty: DifficultyType;
  salary: number;
  startMoney: number;
  avatar: string;
}

export const CharacterInfo = ({
  name,
  difficulty,
  salary,
  startMoney,
  avatar,
}: Props) => {
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.name}>
          <Avatar
            size={"default"}
            src={avatar}
            style={{
              marginRight: "10px",
            }}
          />
          {name}
        </div>
        <DifficultyCard difficulty={difficulty} />
      </div>
      <div>
        <div className={classes.info}>
          Зарплата:
          <div className={classes.money}>
            {salary} <MoneyIcon size="s" />
          </div>
        </div>
        <div className={classes.info}>
          Сбережения:
          <div className={classes.money}>
            {startMoney} <MoneyIcon size="s" />
          </div>
        </div>
      </div>
    </div>
  );
};
