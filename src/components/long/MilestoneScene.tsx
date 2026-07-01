import {
    Audio,
    interpolate,
    OffthreadVideo,
    Sequence,
    spring,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";
import { BackgroundScene } from "../shared/BackgoundScene";
import { MilestoneCard } from "./MilestoneCard";
import { Fragment } from "react/jsx-runtime";
import { Confetti } from "../shared/Confetti";
import { Entity } from "../../data/types";
import { assets } from "../../data/assets";

type MilestoneSceneProps = {
    items: Entity[];
    topicName: string,
    musicFile?: string;
    folder: string;
};

const CARD_WIDTH = 330;
const GAP = 0;

const START_X =
    (1800 - (CARD_WIDTH * 5 + GAP * 4)) / 2;

const CARD_POSITIONS = Array.from({ length: 5 }, (_, index) => ({
    left: START_X + index * (CARD_WIDTH + GAP),
    top: 410,
}));

export const MilestoneScene = ({
    items,
    topicName,
    musicFile,
    folder,
}: MilestoneSceneProps) => {
    const INITIAL_DELAY = 100;
    const REVEAL_GAP = 45;

    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const boardScale = spring({
        frame,
        fps,
        config: {
            damping: 10,
            stiffness: 180,
            mass: 0.7,
        },
    });

    const scale = interpolate(
        boardScale,
        [0, 1],
        [0.9, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const opacity = interpolate(
        frame,
        [0, 15],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <>
            {/* Milestone Background */}
            <BackgroundScene image={staticFile("shared/images/milestone_background.png")} />

            <Confetti />

            <Audio
                src={staticFile("shared/audio/dialogues/milestone_intro.mp3")}
            />

            <Sequence durationInFrames={90}>
                {/* Happy Kiku */}
                <OffthreadVideo
                    src={assets.shared.happy}
                    transparent
                    style={{
                        position: "absolute",
                        bottom: 180,
                        right: 0,
                        width: 350,
                        zIndex: 999,
                    }}
                />

                {/* BG Music */}
                {musicFile && (
                    <Audio
                        src={musicFile}
                        volume={0.60}
                    />
                )}
            </Sequence>

            {/* Kiku Pointing */}
            <Sequence from={90}>
                <OffthreadVideo
                    src={assets.shared.pointing}
                    transparent
                    style={{
                        position: "absolute",
                        bottom: 180,
                        right: 0,
                        width: 350,
                        zIndex: 999,
                        clipPath: "inset(0 0 10px 0)",
                    }}
                    volume={0.60}
                />
            </Sequence>

            {/* Wooden Board Text */}
            <div
                style={{
                    position: "absolute",
                    top: 290,
                    left: "50%",
                    transform: `translateX(-50%) scale(${scale})`,
                    opacity,
                    maxWidth: 900,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        fontSize: 54,
                        fontWeight: "bold",

                        color: "#704214",

                        letterSpacing: 1,

                        textAlign: "center",

                        textShadow: `
                            0 1px 0 rgba(255,255,255,.5),
                            0 2px 3px rgba(0,0,0,.12)
                        `
                    }}
                >
                    {topicName}
                </div>
            </div>

            {items.map((item, index) => {
                const revealFrame = INITIAL_DELAY + index * REVEAL_GAP;

                return (
                    <Fragment key={item.name}>
                        <Sequence
                            from={revealFrame + 10}
                            durationInFrames={45}
                        >
                            <Audio
                                src={assets.entity.callout(item)}
                            />
                        </Sequence>

                        <MilestoneCard
                            item={{
                                name: item.name,
                                image: assets.entity.image(item)
                            }}
                            folder={folder}
                            revealFrame={revealFrame}
                            style={{
                                position: "absolute",
                                top: CARD_POSITIONS[index].top,
                                left: CARD_POSITIONS[index].left,
                                width: 300,
                                height: 370,
                            }}
                        />
                    </Fragment>
                );
            })}
        </>
    );
};