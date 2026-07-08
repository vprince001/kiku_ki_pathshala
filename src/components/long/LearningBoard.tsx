import { useCurrentFrame } from "remotion";
import {
  getResponsiveFontSize,
  getTransitionEffect,
  splitEnglishWord,
} from "../../helpers";
import { assets } from "../../data/assets";

type LearningBoardProps = {
  englishWord: string;
  hindiWord?: string;
  englishScale: number;
  englishOpacity: number;
  hindiScale: number;
  hindiOpacity: number;
};

export const LearningBoard = ({
  englishWord,
  hindiWord,
  englishScale,
  englishOpacity,
  hindiScale,
  hindiOpacity,
}: LearningBoardProps) => {
  const frame = useCurrentFrame();
  const shouldWrap = englishWord.length > 14;

  const englishLines = splitEnglishWord(englishWord);


  const longestLine = Math.max(
    ...englishLines.map((line) => line.length)
  );

  const fontSize = Math.min(
    120,
    1050 / longestLine
  );

  const hindiLines = hindiWord ? splitEnglishWord(hindiWord) : [];
  console.log("hindiLines", hindiLines);

  const longestHindiLine = Math.max(
    ...hindiLines.map((line) => line.length)
  );
  console.log("longestHindiLine", longestHindiLine);

  const hindiFontSize =
    hindiLines.length === 1
      ? Math.min(120, 900 / longestHindiLine)
      : Math.min(120, 1300 / longestHindiLine);

  return (
    <div
      style={{
        position: "absolute",
        right: getTransitionEffect(frame, [-740, 80]),
        top: hindiWord ? 80 : 160,
        width: 750,
        height: hindiWord ? 600 : 350,
        background: "#ffffff",
        border: "12px solid #f4c63d",
        borderRadius: 40,
        boxShadow:
          "0 12px 30px rgba(0,0,0,0.12)",
      }}
    >
      {/* Star */}
      <div
        style={{
          position: "absolute",
          width: "40%",
          top: -100,
          left: 230,
        }}
      >
        <img
          src={assets.shared.boardStar}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* English */}
      <div
        style={{
          position: "absolute",
          left: -10,
          top: englishLines.length > 1 ? 80 : 120,
          width: "100%",
          textAlign: "center",
          fontSize: fontSize,
          whiteSpace: shouldWrap ? "normal" : "nowrap",
          fontWeight: 900,
          color: "#0f3c95",
          opacity: englishOpacity,
          transform: `translateX(scale(${englishScale})`,
          transformOrigin: "center center",
          lineHeight: 0.9,
          textShadow: "6px 6px 0px rgba(0,0,0,0.15)",
        }}
      >
        {englishLines.map((line) => (
          <div key={line}>
            {line}
          </div>
        ))}
      </div>

      {/* Divider */}
      {hindiWord && <div
        style={{
          position: "absolute",
          top: 290,
          left: 30,
          width: 660,
          height: 3,
          background: "#e8bf45",
        }}
      />}

      {/* Hindi */}
      {hindiWord && (
        <div
          style={{
            position: "absolute",
            top: 320,
            left: "50%",
            transform: `translateX(-50%) scale(${hindiScale})`,
            background: "#d8b4fe",
            padding: "20px 60px",
            borderRadius: 999,
            opacity: hindiOpacity,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            fontSize: hindiFontSize,
            fontWeight: 700,
            color: "#4f46e5",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {hindiLines.map((line) => (
            <div key={line}>
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};