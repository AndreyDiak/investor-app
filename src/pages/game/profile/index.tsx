
import { PersonImage } from '../../../components/PersonImage/PersonImage';
import { useAppSelector } from '../../../features/hooks';
import { selectCharacter } from '../../../features/slices';
import classes from './index.module.css'

const ProfilePage = () => {

  const character = useAppSelector(selectCharacter)

  return <div className={`${classes.page} backgroundBanner`}>
    <div>
      {/* <PersonImage image={character?.photo.img} /> */}
    </div>
    <div>

    </div>
  </div>;
};

export default ProfilePage;
