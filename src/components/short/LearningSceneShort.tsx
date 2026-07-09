import {
    Audio,
    interpolate,
    useCurrentFrame,
} from "remotion";
import { ObjectImage } from "../shared/ObjectImage";
import { TimerBox } from "../shared/TimerBox";
import { KikuAnimation } from "../shared/KikuAnimation";
import { assets } from "../../data/assets";

const getScale = (text: string) => {
    const maxChars = 8;

    if (text.length <= maxChars) return 1;

    return maxChars / text.length;
};

type LearningSceneShortProps = {
    image: string;
    name: string;
    hindiName?: string;
    audioFile: string;
    learningFrames?: number;
};

export const LearningSceneShort = ({
    image,
    name,
    hindiName,
    audioFile,
    learningFrames = 300,
}: LearningSceneShortProps) => {
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
            {/* Object Image */}
            <ObjectImage
                image={image}
                transform={`scale(${imageScale}) rotate(${rotation}deg)`}
                style={{
                    top: 300,
                    right: 270,
                    width: "50%",
                    height: "50%",
                }}
            />

            <TimerBox style={{
                position: "absolute",
                bottom: 120,
                left: "40%",
                transform: "translateX(-50%)",
                width: 1000,
            }} />

            {/* English Name */}
            <div
                style={{
                    position: "absolute",
                    left: -115,
                    bottom: 330,
                    width: "100%",
                    textAlign: "center",
                    fontSize: 170,
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
                    fontSize: 150,
                    fontWeight: "bold",
                    color: "#4f46e5",
                    opacity: hindiOpacity,
                    transform: `scale(${hindiScale})`,
                    textShadow: `6px 6px 0px rgba(0,0,0,0.15)`,
                }}
            >
                {hindiName}
            </div>}

            {/* Kiku Pointing */}
            <KikuAnimation
                webm={assets.shared.pointing}
                style={{
                    position: "absolute",
                    bottom: -360,
                    right: -150,
                    width: 680,
                    zIndex: 1,
                }}
                volume={0.50}
                learningFrames={learningFrames}
            />

            {/* Narration Audio */}
            <Audio src={audioFile} />
        </>
    );
};