import { staticFile } from "remotion";

type ThumbnailSceneProps = {
  thumbnail: string;
};

export const ThumbnailScene = ({
  thumbnail,
}: ThumbnailSceneProps) => {
  return (
    <img
      src={staticFile(thumbnail)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1000,
      }}
    />
  );
};