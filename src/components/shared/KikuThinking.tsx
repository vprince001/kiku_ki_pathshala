import { OffthreadVideo } from "remotion";
import { assets } from "../../data/assets";

export const KikuThinking = () => {
    return (
        <OffthreadVideo
            src={assets.shared.thinking}
            style={{
                position: "absolute",
                bottom: 0,
                right: 100,
                width: 600,
                zIndex: 100,
                clipPath: "inset(0 0 15px 0)",
            }}
            transparent
            volume={0.70}
        />
    );
};