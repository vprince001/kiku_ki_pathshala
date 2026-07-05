import { Img, OffthreadVideo, staticFile } from "remotion";

const PREVIEW = process.env.KIKU_PREVIEW === "true";
console.log("PREVIEW", PREVIEW);

type KikuAnimationProps = {
     webm: string;
    style: React.CSSProperties;
    volume?: number;
    learningFrames?: number;
};

export const KikuAnimation = ({
    webm,
    style,
    volume = 1,
    learningFrames = 300,
}: KikuAnimationProps) => {
    const POINTING_ANIMATION_FRAMES = 300;
    const playbackRate = Math.min(1, POINTING_ANIMATION_FRAMES/(learningFrames+10));

    if (PREVIEW) {
        return (
            <Img
                src={staticFile("shared/images/kiku_barefoot.png")}
                style={style}
            />
        );
    }

    return (
        <OffthreadVideo
            src={webm}
            style={style}
            volume={volume}
            playbackRate={playbackRate}
            transparent
        />
    );
};