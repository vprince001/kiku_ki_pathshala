import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT_DIR =
  "./public/images";

const OUTPUT_DIR =
  `${INPUT_DIR}-cropped`;

async function cropToSquare(
  imagePath: string
) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(
      OUTPUT_DIR,
      { recursive: true }
    );
  }

  const image = sharp(imagePath);

  const { data, info } =
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({
        resolveWithObject: true,
      });

  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  let transparentPixels = 0;
  let opaquePixels = 0;

  for (let y = 0; y < info.height; y++) {
    for (
      let x = 0;
      x < info.width;
      x++
    ) {
      const alpha =
        data[
        (y * info.width + x) *
        4 +
        3
        ];

      if (alpha > 10) {
        opaquePixels++;

        minX = Math.min(
          minX,
          x
        );

        minY = Math.min(
          minY,
          y
        );

        maxX = Math.max(
          maxX,
          x
        );

        maxY = Math.max(
          maxY,
          y
        );
      } else {
        transparentPixels++;
      }
    }
  }

  console.log(
    "\n===================="
  );

  console.log(
    `File: ${path.basename(
      imagePath
    )}`
  );

  console.log(
    "Image Size:",
    {
      width: info.width,
      height: info.height,
    }
  );

  console.log(
    "Bounds:",
    {
      minX,
      minY,
      maxX,
      maxY,
    }
  );

  console.log(
    "Object Size:",
    {
      width:
        maxX - minX,
      height:
        maxY - minY,
    }
  );

  console.log(
    "Alpha Samples:",
    {
      topLeft: data[3],

      center:
        data[
        (
          Math.floor(
            info.height /
            2
          ) *
          info.width +
          Math.floor(
            info.width /
            2
          )
        ) *
        4 +
        3
        ],

      bottomRight:
        data[
        (
          (info.height -
            1) *
          info.width +
          (info.width -
            1)
        ) *
        4 +
        3
        ],
    }
  );

  console.log(
    "Pixels:",
    {
      transparentPixels,
      opaquePixels,
      transparencyPercent:
        (
          (transparentPixels /
            (transparentPixels +
              opaquePixels)) *
          100
        ).toFixed(2) +
        "%",
    }
  );

  if (
    opaquePixels === 0
  ) {
    console.log(
      "⚠ No visible pixels found"
    );
    return;
  }

  const objectWidth =
    maxX - minX + 1;

  const objectHeight =
    maxY - minY + 1;

  const squareSize = Math.max(
    objectWidth,
    objectHeight
  );

  console.log(
    "Object Size:",
    {
      objectWidth,
      objectHeight,
      squareSize,
    }
  );

  const outputPath = path.join(
    OUTPUT_DIR,
    path.basename(imagePath)
  );

  const croppedBuffer =
    await sharp(imagePath)
      .extract({
        left: minX,
        top: minY,
        width: objectWidth,
        height: objectHeight,
      })
      .png()
      .toBuffer();

  const leftPadding =
    Math.floor(
      (squareSize - objectWidth) /
      2
    );

  const topPadding =
    Math.floor(
      (squareSize - objectHeight) /
      2
    );

  console.log(
    "Padding:",
    {
      leftPadding,
      topPadding,
    }
  );

  await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
    },
  })
    .composite([
      {
        input: croppedBuffer,
        left: leftPadding,
        top: topPadding,
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(
    `✓ Saved: ${path.basename(
      imagePath
    )}`
  );
}

async function main() {
  const files = fs
    .readdirSync(
      INPUT_DIR
    )
    .filter((file) =>
      file.endsWith(
        ".png"
      )
    );

  console.log(
    `Found ${files.length} files\n`
  );

  for (const file of files) {
    await cropToSquare(
      path.join(
        INPUT_DIR,
        file
      )
    );
  }

  console.log(
    "\n🎉 All images processed."
  );
}

main().catch(
  console.error
);