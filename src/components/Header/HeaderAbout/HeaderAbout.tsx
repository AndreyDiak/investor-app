import { Avatar } from "antd";

interface Props {
  avatar: string;
  name: string;
}

import classes from './HeaderAbout.module.css'

export const HeaderAbout = ({ avatar, name }: Props) => {
  return (
    <div className={classes.about}>
      <div>
        <Avatar src={avatar} size={'default'} />
      </div>
      <div className={classes.text}>
        {name}
      </div>
    </div>
  )
}