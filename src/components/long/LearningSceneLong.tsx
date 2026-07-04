import {
    Audio,
    OffthreadVideo,
    Sequence,
    staticFile,
    useCurrentFrame,
} from "remotion";
import {
    getNameOpacity,
    getNameScale,
    getTextScale,
    getTransitionEffect
} from "../../helpers";
import { ObjectImage } from "../shared/ObjectImage";
import { LearningBoard } from "./LearningBoard";
import { TimerBox } from "../shared/TimerBox";
import { assets } from "../../data/assets";
import { KikuAnimation } from "../shared/KikuAnimation";

type LearningSceneLongProps = {
    image: string;
    name: string;
    hindiName?: string;
    audioFile: string;
    folder: string;
    showTimer?: boolean;
    showCorrect?: boolean;
};

export const LearningSceneLong = ({
    image,
    name,
    hindiName,
    audioFile,
    folder,
    showTimer = true,
    showCorrect = true,
}: LearningSceneLongProps) => {
    const frame = useCurrentFrame();

    const floatY = Math.sin(frame / 15) * 5;
    const showObjectTransition = showTimer || showCorrect;

    return (
        <>
            <Sequence durationInFrames={15}>
                {/* Yellow box */}
                <TimerBox style={{
                    position: "absolute",
                    bottom: showObjectTransition ? getTransitionEffect(frame, [-110, -400]) : -400,
                    left: "41%",
                    transform: "translateX(-50%)",
                    width: 650,
                }} />

                {/* Three star bounce animation */}
                {showCorrect && (
                    <OffthreadVideo
                        src={staticFile("shared/images/timer/star_animation.webm")}
                        trimBefore={70}
                        volume={0}
                        style={{
                            position: "absolute",
                            top: getTransitionEffect(frame, [480, 1100]),
                            left: "41%",
                            transform: "translateX(-50%)",
                            width: getTransitionEffect(frame, [520, 220]),
                            zIndex: 999,
                        }}
                        transparent
                    />
                )}
            </Sequence>

            <Sequence>
                {/* Object */}
                <ObjectImage
                    image={image}
                    style={{
                        top: showObjectTransition ? getTransitionEffect(frame, [225, 270]) : 270,
                        right: showObjectTransition ? getTransitionEffect(frame, [850, 1075]) : 1075,
                        width: showObjectTransition ? getTransitionEffect(frame, [540, 600]) : 600,
                        height: showObjectTransition ? getTransitionEffect(frame, [430, 540]) : 540,
                    }}
                    transform={`translateY(${floatY}px) scale(2)`}
                />

                {/* BOARD */}
                <LearningBoard
                    englishWord={name}
                    hindiWord={hindiName}
                    englishOpacity={getNameOpacity(frame)}
                    englishScale={getNameScale(frame) * getTextScale(name, 7)}
                    hindiOpacity={getNameOpacity(frame, [10, 14])}
                    hindiScale={
                        getNameScale(frame, [10, 14, 18, 22]) *
                        getTextScale(hindiName ?? "", 10)
                    }
                />

                {/* Kiku Pointing */}
                <KikuAnimation
                    webm={assets.shared.pointing}
                    style={{
                        position: "absolute",
                        bottom: getTransitionEffect(frame, [0, -40]),
                        right: getTransitionEffect(frame, [200, -100]),
                        width: getTransitionEffect(frame, [600, 470]),
                        zIndex: 999,
                    }}
                    volume={0.50}
                />

                {/* Narration */}
                <Audio src={audioFile} />
            </Sequence>
        </>
    );
};