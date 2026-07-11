import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { splitEnglishWord } from "../../helpers";

type MilestoneCardProps = {
  item: {
    name: string;
    image: string;
  };
  style: React.CSSProperties;
  revealFrame: number;
};

export const MilestoneCard = ({
  item,
  revealFrame,
  style,
}: MilestoneCardProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - revealFrame);

  const imageScale = spring({
      frame: localFrame,
      fps,
      config: {
        damping: 12,
        stiffness: 180,
      },
    });

  const starScale = spring({
    frame: Math.max(0, localFrame - 14),
    fps,
    config: {
      damping: 10,
      stiffness: 220,
    },
  });

  const imageOpacity = interpolate(
    localFrame,
    [0, 8],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const nameOpacity = interpolate(
    localFrame,
    [8, 14],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const starOpacity = interpolate(
    localFrame,
    [14, 20],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const lines = splitEnglishWord(item.name);

  const longestLine = Math.max(
    ...lines.map((l) => l.length)
  );

  const fontSize = Math.min(
    34,
    270 / longestLine
  );

  return (
    <div
      style={{
        position: "absolute",
        overflow: "visible",
        zIndex: 1,
        ...style,
      }}
    >
      {/* Card Ground Shadow */}
      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: -100,
          width: "85%",
          height: 24,

          borderRadius: "50%",

          background: "rgba(20,40,80,0.25)",

          filter: "blur(14px)",

          zIndex: 999,
        }}
      />

      {/* Card Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 32,
          border: "6px solid #E6B43A",
          outline: "2px solid #F9D76A",
          background: `
            radial-gradient(
              circle at center,
              #FFFDF9 0%,
              #FFF8EA 65%,
              #FFF2D4 100%
            )
          `,
          boxShadow: `
            inset 0 2px 4px rgba(255,255,255,.9),
            inset 0 -4px 6px rgba(220,170,30,.18)
          `
        }}
      />

      {/* Placeholder Star */}
      <Img
        src={staticFile("shared/images/placeholder_star.png")}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 150,
          transform: "translate(-50%, -50%)",
          opacity: interpolate(
            localFrame,
            [0, 8],
            [0.35, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          ),
        }}
      />

      {/* Object Image */}
      <Img
        src={item.image}
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          width: "calc(100% - 24px)",
          objectFit: "contain",
          opacity: imageOpacity,
          transform: `scale(${imageScale})`,
          transformOrigin: "center center",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 4,
          width: "96%",
          height: lines.length === 1 ? 50 : 60,
          left: 6,
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,

          background:
            "linear-gradient(180deg,#4F8CFF,#2C67E8)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          color: "white",
          fontSize: item.name.length > 14 ? fontSize : 34,
          lineHeight: 1.1,
          fontWeight: 900,
          textShadow: "0 2px 4px rgba(0,0,0,.25)",
          opacity: nameOpacity,
        }}
      >
        {lines.map((line) => (
          <div key={line}>
            {line}
          </div>
        ))}
      </div>

      {/* Top Gold Star */}
      <Img
        src={staticFile("shared/images/golden_star.png")}
        style={{
          position: "absolute",
          top: -30,
          left: "4%",
          width: 64,
          height: 64,
          transform: `translateX(-50%) scale(${starScale})`,
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
          opacity: starOpacity,
        }}
      />
    </div>
  );
};