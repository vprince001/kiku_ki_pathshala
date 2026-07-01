import { staticFile } from "remotion"

type TimerBoxProps = {
    style?: React.CSSProperties;
}

export const TimerBox = ({ style }: TimerBoxProps) => {
    return <img
        src={staticFile("shared/images/timer/yellow_box.png")}
        style={{ ...style }}
    />
}