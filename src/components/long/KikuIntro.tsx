import { OffthreadVideo, staticFile } from "remotion";

export const KikuIntro = () => {
    return (
        <OffthreadVideo
            src={staticFile("kiku/thinking.webm")}
            style={{
                position: "absolute",
                bottom: -360,
                right: -150,
                width: 680,
                zIndex: 100,
            }}
            transparent
            volume={1}
        />
    );
};