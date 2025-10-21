"use client";

import Image from "next/image";
import { useState } from "react";

const PartyVotes = ({ party }) => {
  const [hover, setHover] = useState(false);
  console.log(party);
  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full lg:h-12  md:h-10 border transition-all duration-300 ease-in-out border-white overflow-hidden cursor-pointer text-[rgb(26,40,107)] hover:text-white md:flex hidden items-center lg:px-4 md:px-2 rounded relative"
        style={{ background: hover ? party.color : "rgb(241,240,240)" }}
      >
        <div
          className="lg:w-1 md:w-[2px] h-full absolute top-0 right-0 z-10"
          style={{ backgroundColor: party.color }}
        />
        <div className="flex items-center gap-2 lg:w-6/12 md:w-[55%] overflow-hidden pr-2 line-clamp-1">
          <div className="lg:size-10 md:size-8 size-10 lg:p-[2px]">
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
          <h2 className="lg:text-lg font-semibold">{party.arabicName}</h2>
        </div>

        <div className="flex items-baseline lg:w-3/12 w-[25%] justify-center">
          <h3 className="font-bold lg:text-lg">
            <span className="digits font-eloquia">
              {String(
                party?.locations
                  ? party?.locations[0].numberOfVoting
                  : party.numberOfVoting
              )}
            </span>
          </h3>
        </div>

        <div className="flex items-baseline lg:w-3/12 w-[20%] justify-center mr-auto">
          <h3 className="font-bold lg:text-lg">
            <span className="digits font-eloquia">
              <span className="font-normal">%</span>12
            </span>
          </h3>
        </div>
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full md:hidden h-24 border transition-all duration-300 ease-in-out border-white overflow-hidden cursor-pointer text-[rgb(26,40,107)] hover:text-white flex px-2 rounded relative"
        style={{ background: hover ? party.color : "rgb(241,240,240)" }}
      >
        <div
          className="lg:w-1 md:w-[2px] h-full absolute top-0 right-0 z-10"
          style={{ backgroundColor: party.color }}
        />
        <div className="flex items-center w-3/12 overflow-hidden line-clamp-1">
          <div className="size-20">
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
        </div>

        <div className="w-9/12 flex mt-2">
          <div className="flex flex-col items-start">
            <h2 className="font-semibold text-xl mb-4 max-sm:text-red-600">{party.arabicName}</h2>
            <div className="flex gap-6">
              <div className="flex items-baseline justify-center">
                <h3 className="text-lg flex items-center">
                  <span className="text-base">عدد الأصوات:</span>

                  <span className="digits font-eloquia text-xl font-bold mr-1">
                    {String(
                      party?.locations
                        ? party?.locations[0].numberOfVoting
                        : party.numberOfVoting
                    )}
                  </span>
                </h3>
              </div>
              <div className="flex">
                <h3 className="text-lg flex items-center">
                  <span className="text-base">نسبة المقاعد:</span>
                  <span className="digits font-eloquia text-xl font-bold mr-1">
                    <span className="font-normal text-base">%</span>12
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
