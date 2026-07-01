import {
    Audio,
    OffthreadVideo,
    interpolate,
    staticFile,
    useCurrentFrame,
} from "remotion";
import { assets } from "../../data/assets";

type IntroSceneProps = {
    audioFile?: string;
    musicFile?: string;
};

export const IntroScene = ({
    audioFile,
    musicFile,
}: IntroSceneProps) => {
    const frame = useCurrentFrame();

    const scale = interpolate(
        frame,
        [0, 10, 20],
        [0.8, 1.1, 1],
        {
            extrapolateRight: "clamp",
        }
    );

    return (
        <>
            {/* KIKU INTRO */}
            <OffthreadVideo
                src={assets.shared.intro}
                transparent
                style={{
                    position: "absolute",
                    bottom: -300,
                    right: 690,
                    width: 600,
                    transform: `scale(${scale})`,
                }}
            />

            {/* Dialogue */}
            {audioFile &&
                <Audio
                    src={staticFile(`audio/${audioFile}`)}
                />
            }

            {/* BG MUSIC */}
            {musicFile &&
                <Audio
                    src={staticFile(`audio/${musicFile}`)}
                    volume={0.60}
                />
            }
        </>
    );
};