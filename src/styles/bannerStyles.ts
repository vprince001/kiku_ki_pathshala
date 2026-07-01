export const bannerTopTextStyle = {
    position: "absolute",
    width: "100%",
    textAlign: "center",

    fontSize: 72,
    fontWeight: 900,

    color: "#ffffff",

    textShadow:
        "0 6px 12px rgba(0,0,0,0.35)",
} as const;

export const bannerNumberStyle = {
    fontSize: 150,
    fontWeight: 900,

    background:
        "linear-gradient(180deg,#fff8b8 0%,#ffe87a 35%,#ffd54a 100%)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",

    WebkitTextStroke: "4px #b56b00",

    textShadow: `
    0px 4px 0px #d89200,
    0px 8px 0px #b56b00,
    0px 12px 16px rgba(0,0,0,0.35)
  `,
} as const;

export const bannerTitleStyle = {
    position: "absolute",
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,

    fontSize: 88,
    fontWeight: 900,

    color: "#ffe066",

    textShadow: `
            0 4px 0 #d97706,
            0 8px 12px rgba(0,0,0,0.25)
          `,
} as const;