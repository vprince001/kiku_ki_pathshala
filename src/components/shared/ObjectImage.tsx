type ObjectImageProps = {
  image: string;
  style: React.CSSProperties;
  transform?: string;
};

export const ObjectImage = ({
  image,
  style,
  transform = "scale(2)",
}: ObjectImageProps) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: transform,
        transformOrigin: "center center",
        ...style,
      }}
    >
      <img
        src={image}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};