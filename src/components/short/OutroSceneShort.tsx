import { Audio, useCurrentFrame } from "remotion";
import { KikuAnimation } from "../shared/KikuAnimation";
import { assets } from "../../data/assets";
import { ObjectImage } from "../shared/ObjectImage";
import { getTransitionEffect } from "../../helpers";

type OutroSceneShortProps = {
    audioFile: string;
};

export const OutroSceneShort = ({
    audioFile,
}: OutroSceneShortProps) => {
    const frame = useCurrentFrame();

    return (
        <>
            {/* KIKU WAVE */}
            <KikuAnimation
                webm={assets.shared.wave}
                style={{
                    position: "absolute",
                    bottom: getTransitionEffect(frame, [-275, 250]),
                    right: getTransitionEffect(frame, [-100, 0]),
                    width: getTransitionEffect(frame, [500, 950]),
                    clipPath: "inset(0 0 15px 0)",
                }}
                volume={0}
                startFrom={30}
            />

            <ObjectImage
                image={assets.shared.channelBoard}
                style={{
                    top: 1200,
                    right: 300,
                    width: getTransitionEffect(frame, [0, 500]),
                    height: getTransitionEffect(frame, [0, 500]),
                }}
            />

            {/* Reveal Music */}
            <Audio src={audioFile} />
        </>

    );
};
