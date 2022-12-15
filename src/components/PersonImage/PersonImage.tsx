import { useAppSelector } from "../../redux/hooks";
import { selectCardWidth, selectPersonImageWidth } from "../../redux/slices";

interface Props {
  image?: string;
}

export const PersonImage = ({ image }: Props) => {

  const width = useAppSelector(selectPersonImageWidth);

  return <img src={image} alt="" style={{
    maxWidth: width
  }} />
}