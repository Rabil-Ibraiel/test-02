import Image from "next/image";
import PartiesRegionWrapper from "./component/PartiesRegionWrapper";
import PartyCardWrapper from "./component/PartyCardWrapper";
import PartyChairs from "./component/PartyChairs";

const HERO_BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4169A5"/><stop offset="100%" stop-color="#275394"/></linearGradient></defs><rect width="16" height="16" fill="url(#g)"/></svg>'
  ).toString("base64");

export const revalidate = 300;

export default function Home() {
  return (
    <div className="lg:max-w-6xl mx-auto px-4 mb-8 mt-4 relative flex flex-col md:gap-6 sm:gap-4 gap-3">
      <div
        className="relative w-full rounded overflow-hidden"
        style={{ aspectRatio: "1152 / 242" }}
      >
        <Image
          src="/hero.svg"
          alt="Gradient background with logo"
          fill
          priority
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
        />
      </div>

      <div className="hidden md:block">
        <PartyChairs />
      </div>

      <PartiesRegionWrapper />

      <div className="mt-3">
        <h2 className="font-semibold text-xl w-full h-fit py-2 pr-8 bg-linear-to-t from-[#275394] to-[#4169A5] text-white rounded">
          U+O�OO�O� OU,O�U+O�OrOO&quot;OO� OU,O1O�OU,USOc
        </h2>

        <PartyCardWrapper />
      </div>
    </div>
  );
}

