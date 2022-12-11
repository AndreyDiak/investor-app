import { CloseOutlined } from "@ant-design/icons";

interface Props {
  handler: () => void;
  color?: string;
  size?: number;
}

export const CloseButton = ({ handler, color, size }: Props) => {
  return (
    <CloseOutlined
      onClick={handler}
      style={{
        color: color || "black",
        fontSize: size || 16,
        fontWeight: 900,
      }}
    />
  );
};
