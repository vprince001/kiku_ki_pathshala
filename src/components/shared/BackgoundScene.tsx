import { AbsoluteFill } from "remotion";

type LayoutProps = {
  image: string;
};

export const BackgroundScene = ({ image } : LayoutProps) => {
  return (
    <AbsoluteFill>
      <img
        src={image}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};