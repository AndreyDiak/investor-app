import { NavLink } from "react-router-dom"

const links = [
  {
    label: 'Расходы',
    to: '/game/spends'
  },
  {
    label: 'Биржа',
    to: '/game/market'
  },
  {
    label: 'Профиль',
    to: '/game/profile'
  },
  {
    label: 'Банк',
    to: '/game/bank'
  },
  {
    label: 'Новости',
    to: '/game/news'
  }
]

import classes from './HeaderLinks.module.css'

export const HeaderLinks = () => {
  return (
    <div className={classes.list}>
      {links.map(link => (
        <div className={classes.link}>
          <NavLink to={link.to}>
            {link.label}
          </NavLink>
        </div>
      ))}
    </div>
  )
}