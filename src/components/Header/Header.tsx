import { useAppSelector } from '../../redux/hooks'
import { selectCharacter } from '../../redux/slices'
import { selectDay } from '../../redux/slices/game/time/timeSlice'
import classes from './Header.module.css'
import { HeaderAbout } from './HeaderAbout/HeaderAbout'
import { HeaderLinks } from './HeaderLinks/HeaderLinks'

export const Header = () => {

  const character = useAppSelector(selectCharacter)!
  const day = useAppSelector(selectDay)
  return (
    <div className={classes.header}>
      {/* Character photo and name */}
      <HeaderAbout avatar={character?.photo.avatar} name={character.name} />
      {/* Change time buttons */}
      <div>
        day: {day}
      </div>
      {/* Links to others pages */}
      <HeaderLinks />

      {/* Current time (day + month) */}

      {/* Player balance? */}
    </div>
  )
}