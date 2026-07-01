import { Audio, OffthreadVideo, staticFile } from "remotion";

type OutroSceneShortProps = {
    video: string;
    style: React.CSSProperties;
};

export const OutroSceneShort = ({
    video,
    style,
}: OutroSceneShortProps) => {
    return (
        <>
            {/* Short */}
            <OffthreadVideo
                src={staticFile(`kiku/${video}`)}
                transparent
                style={{
                    position: "absolute",
                    zIndex: 999,
                    clipPath: "inset(0px 0px 2px 0px)",
                    ...style,
                }}
            />

            {/* Reveal Music */}
            <Audio
                src={staticFile("audio/reveal_music.mp3")}
            />
        </>

    );
};
