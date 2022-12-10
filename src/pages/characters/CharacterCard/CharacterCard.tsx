import { Person } from "../../../features/slices/characters/typings";
import { Avatar, Card } from "antd";
interface Props {
  character: Person;
  selected?: boolean;
}

import classes from "./CharacterCard.module.css";

export const CharactersCard = ({ character, selected }: Props) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img src={character.photo.img} />}
      className={classes.card}
    >
      {/* <Avatar size={"large"} src={character.photo.avatar} /> */}
      <Card.Meta
        title={
          <div>
            {character.name} <br />
            {character.difficulty} <br />
            {character.salary}
          </div>
        }
        description={character.work}
        avatar={<Avatar src={character.photo.avatar} />}
        className={""}
      />
    </Card>
  );
};
