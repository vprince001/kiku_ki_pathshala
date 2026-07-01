import { Audio, OffthreadVideo } from "remotion";
import { assets } from "../../data/assets";

type BriefSceneProps = {
    itemCount: number;
    musicFile?: string;
    folder: string;
};

export const BriefScene = ({
    itemCount,
    musicFile,
    folder,
}: BriefSceneProps) => {
    return (
        <>
            {/* KIKU HAPPY */}
            <OffthreadVideo
                src={assets.shared.wave}
                transparent
                style={{
                    position: "absolute",
                    bottom: -10,
                    right: 620,
                    width: 600,
                }}
            />

            {/* DIALOGUE */}
            <Audio src={assets.video.briefAudio(folder, itemCount)} />

            {/* BG MUSIC */}
            {musicFile && <Audio src={musicFile} />}
        </>
    );
};