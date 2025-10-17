"use client";

import Image from "next/image";
import { useState } from "react";

const PartyVotes = ({ party }) => {
  const [hover, setHover] = useState(false);
  console.log(party);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full h-12 border transition-all duration-300 ease-in-out border-white overflow-hidden cursor-pointer text-[rgb(26,40,107)] hover:text-white flex items-center justify-between px-4 rounded relative"
      style={{ background: hover ? party.color : "rgb(241,240,240)" }}
    >
      <div
        className="w-1 h-full absolute top-0 right-0 z-10"
        style={{ backgroundColor: party.color }}
      />
      <div className="flex items-center gap-2 w-6/12 ">
        <div className="w-10 h-10 p-[2px]">
          {hover ? (
            <Image
              src={`/${party.abbr}-W.png`}
              width={"100"}
              height={"100"}
              alt=""
            />
          ) : (
            <Image
              src={`/${party.abbr}.png`}
              width={"100"}
              height={"100"}
              alt=""
            />
          )}
        </div>
        <h2 className="text-lg font-semibold">{party.arabicName}</h2>
      </div>

      <div className="flex items-baseline gap-2 w-3/12">
        <h3 className="font-bold text-lg">
          <span className="digits font-eloquia">
            {String(
              party?.locations
                ? party?.locations[0].numberOfVoting
                : party.numberOfVoting
            )}
          </span>
        </h3>
      </div>

      <div className="flex items-baseline gap-2 w-2/12">
        <h3 className="font-bold text-lg">
          <span className="digits font-eloquia">
            {party.numberOfSubscribing}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default PartyVotes;

// Same code for before all:

{
  /* <div className="w-full h-12 border transition-all duration-300 ease-in-out border-white overflow-hidden bg-[rgb(241,240,240)] hover:bg-yellow-400 cursor-pointer text-[rgb(26,40,107)] hover:text-white flex items-center justify-between px-4 rounded">
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
    </div> */
}
