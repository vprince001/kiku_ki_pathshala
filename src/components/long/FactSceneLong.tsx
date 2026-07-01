import {
    Audio,
    OffthreadVideo,
    Sequence,
    staticFile,
} from "remotion";


type FactSceneLongProps = {
    videoFile: string;
    folder: string;
};

export const FactSceneLong = ({
    videoFile,
    folder,
}: FactSceneLongProps) => {
    return (
        <>
            {/* Fact Video */}
            <OffthreadVideo
                src={videoFile}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
                volume={1}
            />

            {/* Kiku Scared */}
            <Sequence durationInFrames={250}>
                <OffthreadVideo
                    src={staticFile("shared/kiku/scared.webm")}
                    trimBefore={47}
                    style={{
                        position: "absolute",
                        bottom: -250,
                        right: 0,
                        width: 400,
                        zIndex: 999,
                        transform: "scaleX(-1)",
                    }}
                    transparent
                />

                {/* KIKU SCARED */}
                <Audio src={staticFile(`shared/kiku/scared.mp3`)} trimBefore={47} />
            </Sequence>

            {/* Kiku Scared - 2 */}
            <Sequence from={250}>
                <OffthreadVideo
                    src={staticFile("shared/kiku/scared.webm")}
                    trimBefore={135}
                    style={{
                        position: "absolute",
                        bottom: -250,
                        right: 0,
                        width: 400,
                        zIndex: 999,
                        transform: "scaleX(-1)",
                    }}
                    transparent
                />
            </Sequence>

            {/* Scary MUSIC */}
            <Audio src={staticFile(`shared/audio/music/scary_music.mp3`)} />
        </>
    );
};