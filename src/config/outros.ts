type OutroConfig = {
  video: string;
  duration: number;
  style: React.CSSProperties;
};

export const SHORT_OUTRO: OutroConfig = {
  video: "like_subscribe.webm",
  duration: 150,
  style: {
    bottom: 100,
    width: 1000,
    right: 50,
  },
};

export const REEL_OUTRO: OutroConfig = {
  video: "like_follow.webm",
  duration: 155,
  style: {
    bottom: -10,
    width: 1100,
    right: 0,
  },
};