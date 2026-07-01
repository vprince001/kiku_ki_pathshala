import { interpolate, staticFile } from "remotion";
import { TimerBox } from "../shared/TimerBox";

type StarProps = { style: React.CSSProperties };

export const Star = ({ style }: StarProps) => {
    return (
        <img
            src={staticFile("shared/images/timer/timer_star.png")}
            style={{
                position: "absolute",
                ...style
            }}
        />
    );
};

const AnimatedStar = ({
    animationFrame,
    disappearing,
    hidden,
    style,
}: {
    animationFrame: number;
    disappearing: boolean;
    hidden: boolean;
    style: React.CSSProperties;
}) => {

    const scale = disappearing
        ? interpolate(
            animationFrame,
            [0, 5, 10],
            [1, 1.8, 0.5],
            { extrapolateRight: "clamp" }
        )
        : 1;

    const opacity = disappearing
        ? interpolate(
            animationFrame,
            [0, 10],
            [1, 0],
            { extrapolateRight: "clamp" }
        )
        : 1;

    if (hidden) {
        return null;
    }

    return (
        <img
            src={staticFile("shared/images/timer/timer_star.png")}
            style={{
                position: "absolute",
                transform: `scale(${scale})`,
                opacity,
                ...style,
            }}
        />
    );
};

type GuessTimerLongProps = {
    frame?: number;
    starContainerStyle: React.CSSProperties;
    firstStarStyle: React.CSSProperties;
    secondStarStyle: React.CSSProperties;
    thirdStarStyle: React.CSSProperties;
    animated?: boolean;
};

export const GuessTimerLong = ({
    frame = 0,
    starContainerStyle,
    firstStarStyle,
    secondStarStyle,
    thirdStarStyle,
    animated = false,
}: GuessTimerLongProps) => {
    return (
        <>
            {/* Yellow Box */}
            <TimerBox style={{
                position: "absolute",
                bottom: -110,
                left: "41%",
                transform: "translateX(-50%)",
                width: 650,
            }} />

            {/* Stars */}
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: 150,
                    ...starContainerStyle
                }}
            >
                {!animated ? (
                    <>
                        <Star style={{ ...firstStarStyle }} />
                        <Star style={{ ...secondStarStyle }} />
                        <Star style={{ ...thirdStarStyle }} />
                    </>
                ) : (
                    <>
                        <AnimatedStar
                            animationFrame={frame - 30}
                            disappearing={frame >= 30 && frame < 40}
                            hidden={frame >= 40}
                            style={{ ...firstStarStyle }}
                        />

                        <AnimatedStar
                            animationFrame={frame - 15}
                            disappearing={frame >= 15 && frame < 25}
                            hidden={frame >= 25}
                            style={{ ...secondStarStyle }}
                        />

                        <AnimatedStar
                            animationFrame={frame}
                            disappearing={frame >= 0 && frame < 10}
                            hidden={frame >= 10}
                            style={{ ...thirdStarStyle }}
                        />
                    </>
                )}
            </div>
        </>
    );
};