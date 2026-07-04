import { Audio } from "remotion";
import { assets } from "../../data/assets";
import { KikuAnimation } from "../shared/KikuAnimation";

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
            {/* KIKU Wave */}
            <KikuAnimation
                webm={assets.shared.wave}
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