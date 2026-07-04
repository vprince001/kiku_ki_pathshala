import { Img, OffthreadVideo, staticFile } from "remotion";

const PREVIEW = process.env.KIKU_PREVIEW === "true";
console.log("PREVIEW", PREVIEW);

type KikuAnimationProps = {
    webm: string;
    style: React.CSSProperties;
    volume?: number;
};

export const KikuAnimation = ({
    webm,
    style,
    volume = 1,
}: KikuAnimationProps) => {
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
            transparent
            style={style}
            volume={volume}
        />
    );
};