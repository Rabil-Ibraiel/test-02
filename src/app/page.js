import PartiesRegionWrapper from "./component/PartiesRegionWrapper";
import PartyCardWrapper from "./component/PartyCardWrapper";
import PartyChairs from "./component/PartyChairs";

export default function Home() {
  return (
    <div className="lg:max-w-[1080px] mx-auto px-4  my-12">
      <PartyChairs />

      <PartiesRegionWrapper />

      {/* ----------- */}

      <div>
        <h2 className="font-extrabold text-2xl w-full h-fit py-1 pr-8 bg-[rgb(53,95,157)] text-white rounded mt-12">
          نتائج الأنتخابات العراقية
        </h2>

        <PartyCardWrapper />
      </div>
    </div>
  );
}
