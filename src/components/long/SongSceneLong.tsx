import {
    Audio,
    interpolate,
    OffthreadVideo,
    Sequence,
    useCurrentFrame,
} from "remotion";
import { assets } from "../../data/assets";
import { getResponsiveFontSize } from "../../helpers";
import { Entity } from "../../data/types";
import { KikuAnimation } from "../shared/KikuAnimation";


type SongSceneLongProps = {
    itemName: Record<"english" | "hindi", string>
    songFile?: string;
    videoFile: string;
    songFrames?: number;
    danceFrames?: number;
    folder: string;
    item?: Entity;
};

export const SongSceneLong = ({
    itemName,
    songFile,
    videoFile,
    songFrames = 300,
    danceFrames = 300,
}: SongSceneLongProps) => {
    const frame = useCurrentFrame();

    const EXIT_DURATION = 18;

    const exitStart = songFrames - EXIT_DURATION;

    const entryOpacity = interpolate(
        frame,
        [0, 8],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Exit
    const exitProgress = interpolate(
        frame,
        [exitStart, songFrames],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const exitOpacity = interpolate(
        exitProgress,
        [0, 1],
        [1, 0]
    );

    return (
        <>
            {/* KIKU HAPPY */}
            <Sequence durationInFrames={240}>
                <KikuAnimation
                    webm={assets.shared.happy}
                    style={{
                        position: "absolute",
                        bottom: -350,
                        right: -40,
                        width: 500,
                    }}
                    volume={0}
                />
            </Sequence>

            {/* KIKU Pointing */}
            <Sequence from={240}>
                <KikuAnimation
                    webm={assets.shared.pointing}
                    style={{
                        position: "absolute",
                        bottom: -350,
                        right: 0,
                        width: 500,
                    }}
                    volume={0}
                />
            </Sequence>
            <div
                style={{
                    position: "absolute",
                    top: 50,
                    left: 80,
                    width: "100%",

                    fontFamily: "Baloo 2",
                    fontWeight: 800,
                    fontSize: 120,
                    letterSpacing: "-2px",
                    lineHeight: 1,

                    color: "#ffffff",
                    opacity: entryOpacity * exitOpacity,

                    textShadow: `
                        0 1px 0 #3A7BFF,
                        0 2px 0 #2D66E8,
                        0 3px 0 #2456C8,
                        0 6px 0 #1B46A5,
                        0 8px 2px rgba(0,0,0,0.28)
                    `,
                }}
            >
                {itemName.english}
            </div>

            <div
                style={{
                    position: "absolute",
                    top: 60,
                    right: 80,
                    width: 700,

                    fontFamily: "Baloo 2",
                    fontWeight: 800,
                    fontSize: getResponsiveFontSize(
                        itemName.hindi ?? "",
                        120,
                        13
                    ),
                    lineHeight: 1,

                    textAlign: "right",
                    whiteSpace: "nowrap",

                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    opacity: entryOpacity * exitOpacity,

                    textShadow: `
                        0 1px 0 #FFB300,
                        0 2px 0 #FFB300,
                        0 3px 0 #F59E00,
                        0 6px 0 #E67E00,
                        0 8px 2px rgba(0,0,0,0.30)
                    `,
                }}
            >
                {itemName.hindi}
            </div>
            {/* Dance Video */}
            <OffthreadVideo
                src={videoFile}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                playbackRate={danceFrames / songFrames}
                volume={0}
            />

            {/* SONG */}
            <Audio src={songFile} />
        </>
    );
};