import Image from "next/image";
const PartyVotes = ({ party }) => {
  console.log(party);
  return (
    <div className="w-full h-12 border transition-all duration-300 ease-in-out border-white overflow-hidden bg-[rgb(241,240,240)] hover:bg-yellow-400 cursor-pointer text-[rgb(26,40,107)] hover:text-white flex items-center justify-between px-4 rounded">
      <div className="flex items-center gap-2 ">
        <div className="w-10 h-10">
          <Image
            src={`/${party.abbr}.png`}
            width={"100"}
            height={"100"}
            alt=""
          />
        </div>
        <h2 className="font-black text-xl">{party.abbr}</h2>
      </div>

      <div className="flex items-baseline gap-2 text-lg">
        <p>نسبة الأصوات</p>
        <h3 className="font-extrabold text-2xl">
          {party?.locations
            ? party?.locations[0].numberOfVoting
            : party.numberOfVoting}
        </h3>
      </div>

      <div className="flex items-baseline gap-2 text-lg">
        <p>نسبة المشاركة</p>
        <h3 className="font-extrabold  text-2xl">215 215 215</h3>
      </div>
    </div>
  );
};

export default PartyVotes;
