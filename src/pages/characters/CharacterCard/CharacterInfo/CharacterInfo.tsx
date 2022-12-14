import { Avatar } from "antd";
import { DifficultyCard } from "../../../../components/common/DifficultyCard/DifficultyCard";
import { MoneyIcon } from "../../../../components/common/MoneyIcon/MoneyIcon";
import { MoneyIconWithPrice } from "../../../../components/common/MoneyIcon/MoneyIconWithPrice/MoneyIconWithPrice";
import { DifficultyType } from "../../../../redux/slices/settings/typings";

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
          <MoneyIconWithPrice price={salary} />
        </div>
        <div className={classes.info}>
          Сбережения:
          <MoneyIconWithPrice price={startMoney} />
        </div>
      </div>
    </div>
  );
};
