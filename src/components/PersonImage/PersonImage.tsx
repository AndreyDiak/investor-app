import { useAppSelector } from "../../features/hooks";
import { selectCardWidth, selectPersonImageWidth } from "../../features/slices";

interface Props {
  image?: string;
}

export const PersonImage = ({ image }: Props) => {

  const width = useAppSelector(selectPersonImageWidth);

  return <img src={image} alt="" style={{
    maxWidth: width
  }} />
}