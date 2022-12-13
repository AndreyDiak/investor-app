import { useAppSelector } from '../../features/hooks'
import { selectCharacter } from '../../features/slices'
import classes from './Header.module.css'
import { HeaderAbout } from './HeaderAbout/HeaderAbout'
import { HeaderLinks } from './HeaderLinks/HeaderLinks'

export const Header = () => {

  const character = useAppSelector(selectCharacter)!

  return (
    <div className={classes.header}>
      <HeaderAbout avatar={character?.photo.avatar} name={character.name} />
      <HeaderLinks />
    </div>
  )
}