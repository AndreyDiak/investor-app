
import { useAppSelector } from '../../../redux/hooks';
import { selectCharacter } from '../../../redux/slices';
import classes from './index.module.css';

const ProfilePage = () => {

  const character = useAppSelector(selectCharacter)!

  return <div className={`${classes.page} backgroundBanner`}>
    <div>
      {/* <PersonImage image={character?.photo.img} /> */}
    </div>
    <div>
      {/* character income */}
      <div></div>
      {/* character expenses*/}
      <div></div>
      {/* character bio */}
      <div></div>
      {/* last news + close button? */}
      <div></div>
    </div>
  </div>;
};

export default ProfilePage;
