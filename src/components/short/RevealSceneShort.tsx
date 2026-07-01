import {
    Audio,
    interpolate,
    OffthreadVideo,
    Sequence,
    staticFile,
    useCurrentFrame,
} from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { TimerBox } from "../shared/TimerBox";
import { LearningBoard } from "../shared/LearningBoard/LearningBoard";
import { getNameOpacity, getNameScale, getTextScale } from "../../helpers";

const getScale = (text: string) => {
    const maxChars = 8;

    if (text.length <= maxChars) return 1;

    return maxChars / text.length;
};

type RevealSceneShortProps = {
    image: string;
    name: string;
    hindiName?: string;
    audioFile: string;
    videoFile: string;
    videoFile2?: string;
    folder: string;
    timings: any;
};

export const RevealSceneShort = ({
    image,
    name,
    hindiName,
    audioFile,
    videoFile,
    videoFile2,
    folder,
    timings,
}: RevealSceneShortProps) => {
    const frame = useCurrentFrame();

    const imageScale = interpolate(
        frame,
        [0, 8, 16, 25],
        [0, 2.2, 1.8, 2],
        {
            extrapolateRight: "clamp",
        }
    );

    const rotation = interpolate(
        frame,
        [0, 8, 16, 25],
        [-8, 4, -2, 0],
        {
            extrapolateRight: "clamp",
        }
    );

    // English visible first
    const englishOpacity = interpolate(
        frame,
        [0, 10, 65, 75],
        [0, 1, 1, 0],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Hindi appears afterwards
    const hindiOpacity = interpolate(
        frame,
        [70, 80, 120],
        [0, 1, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const englishScale = interpolate(
        frame,
        [0, 4, 8, 12],
        [0.1, 1.3, 0.9, 1],
        {
            extrapolateRight: "clamp",
        }
    );

    const hindiScale = interpolate(
        frame,
        [40, 44, 48, 52],
        [0.1, 1.3, 0.9, 1],
        {
            extrapolateRight: "clamp",
        }
    );

    return (
        <>
            {/* Kiku Pointing */}
            <Sequence from={1} durationInFrames={timings.KIKU_POINTING}>
                <OffthreadVideo
                    src={staticFile("kiku/pointing.webm")}
                    style={{
                        position: "absolute",
                        bottom: -360,
                        right: -150,
                        width: 680,
                        zIndex: 100,
                    }}
                    transparent
                />
            </Sequence>

            {/* Object Image */}
            <ObjectImage
                image={`${folder}/images/${image}`}
                transform={`scale(${imageScale}) rotate(${rotation}deg)`}
                style={{
                    top: 300,
                    right: 270,
                    width: "50%",
                    height: "50%",
                }}
            />

            <Sequence from={1}>
                <TimerBox style={{
                    position: "absolute",
                    bottom: 120,
                    left: "40%",
                    transform: "translateX(-50%)",
                    width: 1000,
                }} />
            </Sequence>

            {/* English Name */}
            <div
                style={{
                    position: "absolute",
                    left: -115,
                    bottom: 360,
                    width: "100%",
                    textAlign: "center",
                    fontSize: 180,
                    fontWeight: "bold",
                    color: "black",
                    opacity: englishOpacity,
                    transform: `scale(${englishScale * getScale(name)})`,
                    textShadow: `6px 6px 0px rgba(0,0,0,0.15)`,
                }}
            >
                {name}
            </div>

            {/* Hindi Name */}
            {hindiName && <div
                style={{
                    position: "absolute",
                    left: -115,
                    bottom: 350,
                    width: "100%",
                    textAlign: "center",
                    fontSize: 160,
                    fontWeight: "bold",
                    color: "#4f46e5",
                    opacity: hindiOpacity,
                    transform: `scale(${hindiScale})`,
                    textShadow: `6px 6px 0px rgba(0,0,0,0.15)`,
                }}
            >
                {hindiName}
            </div>}

            {/* Narration Audio */}
            <Sequence
                durationInFrames={
                    videoFile2 ?
                        timings.KIKU_POINTING + (timings.FACT_DURATION * 2) :
                        timings.KIKU_POINTING + timings.FACT_DURATION
                }
            >
                <Audio
                    src={staticFile(`${folder}/audio/${audioFile}`)}
                />
            </Sequence>

            {/* FACT VIDEO */}
            <Sequence
                from={timings.FACT_START_OFFSET}
                durationInFrames={timings.FACT_DURATION}
            >
                <OffthreadVideo
                    src={staticFile(`${folder}/videos-short/${videoFile}`)}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Sequence>

            {/* FACT VIDEO 2 */}
            {videoFile2 &&
                <Sequence
                    from={timings.FACT_START_OFFSET + timings.FACT_DURATION}
                    durationInFrames={timings.FACT_DURATION}
                >
                    <OffthreadVideo
                        src={staticFile(`${folder}/videos-short/${videoFile2}`)}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Sequence>
            }

            {/* Reveal Music */}
            <Sequence
                from={timings.FACT_START_OFFSET}
            >
                <Audio
                    src={staticFile(`audio/reveal_music.mp3`)}
                />
            </Sequence>
        </>
    );
};