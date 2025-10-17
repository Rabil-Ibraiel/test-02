"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const PartyCard = ({ party }) => {
  const [clicked, setClicked] = useState("");
  return (
    <div
      id="PDK"
      onClick={() => setClicked(clicked === "PDK" ? "" : "PDK")}
      className="group h-20 w-full rounded overflow-hidden bg-[rgb(238,241,255)] cursor-pointer border-1 border-white flex items-center justify-between relative pr-4 pl-10"
    >
      <div
        className="w-1 h-full absolute top-0 right-0"
        style={{ backgroundColor: party.color }}
      ></div>
      <AnimatePresence>
        {clicked === "PDK" && (
          <motion.div
            key="pdk-bar-fill"
            exit={{
              width: 0, // Animate width back to 0 on exit
              transition: {
                // Use a shorter duration for the exit if desired
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            animate={{
              width: [
                0,
                475 + (925 - 475) * (Number(party.numberOfVoting) / 1000000),
              ], // 925 max --- min 475
              transition: {
                type: "tween", // Use tween for predictable duration
                duration: 0.75, // Set to 5 seconds (adjust this number)
                ease: "easeInOut", // Use a smooth easing function
              },
            }}
            className="w-[75%] h-full absolute top-0 right-0 z-20"
            style={{ backgroundColor: party.color }}
          >
            <motion.p
              animate={{
                opacity: clicked === "PDK" ? [0, 1] : 0,
                transition: {
                  type: "tween", // Use tween for predictable duration
                  duration: 0.75, // Set to 5 seconds (adjust this number)
                  ease: "easeInOut", // Use a smooth easing function
                },
              }}
              className="font-black text-5xl absolute -left-32 top-1/2 -translate-y-1/2"
            >
              {((Number(party.numberOfVoting) / 1000000) * 100).toFixed()}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {clicked === "PDK" && (
        <motion.div
          animate={{
            opacity: clicked === "PDK" ? [0, 1] : 0,
            transition: {
              type: "tween", // Use tween for predictable duration
              duration: 0.75, // Set to 5 seconds (adjust this number)
              ease: "easeInOut", // Use a smooth easing function
            },
          }}
          className="flex items-center justify-between w-full absolute z-30"
        >
          <div className="flex items-center gap-2">
            <div className="w-12  h-12  ">
              <Image
                src={`/${party.abbr}-W.png`}
                width={"100"}
                height={"100"}
                alt=""
              />
            </div>

            <h2 className="font-bold text-white text-xl">{party.arabicName}</h2>
          </div>
        </motion.div>
      )}

      <motion.div
        animate={{
          x: clicked ? 600 : 0,
          opacity: clicked ? [1, 0] : 1,
          transition: {
            type: "tween", // Use tween for predictable duration
            duration: 0.75, // Set to 5 seconds (adjust this number)
            ease: "easeInOut", // Use a smooth easing function
          },
        }}
        className="flex items-center justify-between w-full relative"
      >
        <div className="flex items-center gap-2 w-5/12">
          <div className="w-12 h-12 ">
            <Image
              src={`/${party.abbr}.png`}
              width={"100"}
              height={"100"}
              alt=""
            />
          </div>

          <h2 className="font-semibold text-xl">{party.arabicName}</h2>
        </div>

        <div className="flex items-baseline gap-1 w-4/12  justify-start">
          <p className="font-semibold">عدد المقاعد</p>
          <p className="font-black text-5xl">
            {party.thisYearChairs > 9
              ? party.thisYearChairs
              : `0${party.thisYearChairs}`}
          </p>
        </div>

        <div className="flex items-baseline gap-1 w-3/12 justify-start">
          <p className="font-semibold">الاصوات</p>
          <p className="font-black text-5xl">{party.numberOfVoting}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PartyCard;
