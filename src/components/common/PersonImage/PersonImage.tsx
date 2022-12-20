import { useAppSelector } from "../../../redux/hooks";
import { selectCardWidth, selectPersonImageWidth } from "../../../redux/slices";

interface Props {
  image?: string;
  size?: number;
}

export const PersonImage = ({ image, size }: Props) => {
  const width = useAppSelector(selectPersonImageWidth);

  return (
    <img
      src={image}
      alt=""
      style={{
        maxWidth: size ? size : width,
      }}
    />
  );
};
