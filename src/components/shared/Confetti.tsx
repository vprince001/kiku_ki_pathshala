import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const COLORS = [
    "#FFD93D",
    "#FF5A5F",
    "#00C2FF",
    "#00E676",
    "#FF8A00",
    "#A855F7",
    "#FF66C4",
];

const random = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
};

type RibbonProps = {
    seed: number;
    startX: number;
};

export const Ribbon = ({
    seed,
    startX,
}: RibbonProps) => {
    const frame = useCurrentFrame();

    const delay = Math.floor(random(seed + 1) * 250);

    const duration = 250 + Math.floor(random(seed + 2) * 280);

    const localFrame = Math.max(0, frame - delay);

    const progress = Math.min(localFrame / duration, 1);
    const centerX = 960;

    const drift = interpolate(
        progress,
        [0, 1],
        [0, (centerX - startX) * 0.35]
    );

    const y = interpolate(progress, [0, 1], [-120, 1180]);

    const sway =
        Math.sin((localFrame + seed * 20) / 12) *
        (20 + random(seed + 3) * 30);

    const rotation = interpolate(
        progress,
        [0, 1],
        [
            0,
            (random(seed + 4) > 0.5 ? 1 : -1) *
            (720 + random(seed + 5) * 720),
        ]
    );

    const opacity = interpolate(
        progress,
        [0, 0.05, 0.9, 1],
        [0, 1, 1, 0]
    );

    const shape = Math.floor(random(seed + 6) * 3);

    const color =
        COLORS[Math.floor(random(seed + 7) * COLORS.length)];

    let width = 10;
    let height = 34;
    let borderRadius: number | string = 999;
    let clipPath: string | undefined;

    switch (shape) {
        case 0:
            // Ribbon
            width = 8 + random(seed + 8) * 6;
            height = 26 + random(seed + 9) * 20;
            borderRadius = 999;
            break;

        case 1:
            // Circle
            width = height = 10 + random(seed + 8) * 8;
            borderRadius = "50%";
            break;

        case 2:
            // Star
            width = height = 18 + random(seed + 8) * 8;
            clipPath =
                "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)";
            borderRadius = 0;
            break;
    }

    return (
        <div
            style={{
                position: "absolute",

                left: startX + drift + sway,
                top: y,

                width,
                height,

                background: color,

                borderRadius,
                clipPath,

                opacity,

                transform: `rotate(${rotation}deg)`,

                boxShadow: "0 3px 6px rgba(0,0,0,.15)",
            }}
        />
    );
};

export const Confetti = () => {
    const PARTICLE_COUNT = 200;
    return (
        <>
            {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
                const leftSide = index < PARTICLE_COUNT / 2;

                const seed = index * 37;

                const startX = leftSide
                    ? -100 + random(seed) * 800
                    : 1220 + random(seed) * 800;

                return (
                    <Ribbon
                        key={index}
                        seed={seed}
                        startX={startX}
                    />
                );
            })}
        </>
    );
};