import {
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

type SparkleProps = {
  x: number;
  y: number;
  delay?: number;
  size?: number;
};

export const Sparkle = ({
  x,
  y,
  delay = 0,
  size = 260,
}: SparkleProps) => {
  const frame = useCurrentFrame();

  const localFrame = (frame + delay) % 45;

  const opacity = interpolate(
    localFrame,
    [0, 8, 20],
    [0, 1, 0],
    {
      extrapolateRight: "clamp",
    }
  );

  const scale = interpolate(
    localFrame,
    [0, 8, 20],
    [0.2, 1, 1.4],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <img
      src={staticFile("images/sparkle.png")}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
};