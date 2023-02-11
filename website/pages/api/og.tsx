/* eslint-disable */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

const unkpkgUrl = "https://unpkg.com/chakra-ui-steps/package.json";

const font = fetch(new URL("../../assets/Sora-Bold.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

const pkgPromise = fetch(unkpkgUrl).then((res) => {
  return res.json();
});

export default async function OG() {
  const fontData = await font;
  const pkg = await pkgPromise;
  const version = pkg.version;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#171923",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Sora",
          flexDirection: "column",
          color: "white",
          paddingTop: "64px",
        }}
      >
        <img
          alt="chakra-ui-logo"
          src="https://chakra-ui-steps.vercel.app/54212428.png"
          style={{
            borderRadius: "50%",
            width: 164,
            height: 164,
          }}
        />
        <h2 style={{ marginTop: "8px" }}>chakra-ui-steps</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              padding: "8px 32px",
              borderRadius: "8px",
              backgroundColor: "#2D3748",
              fontSize: "64px",
              marginTop: "-32px",
            }}
          >
            v{version}
          </h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 627,
      fonts: [
        {
          name: "Sora",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
