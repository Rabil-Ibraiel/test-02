"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";

const PartyCard = ({ party }) => {
  const [clicked, setClicked] = useState("");
  const cardRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const votingRatio = Math.min(
    1,
    Math.max(0, Number(party.numberOfVoting) / 1_000_000)
  );
  const percent = Math.round(votingRatio * 100); // 0..100 logical scale
  const MIN_BAR_PX = 400; // control where the fill begins in pixels
  const effectiveContainer = containerWidth || MIN_BAR_PX;
  const maxWidthPx = Math.min(effectiveContainer, 940);
  const minWidthPx = Math.min(MIN_BAR_PX, maxWidthPx);
  const widthRange = Math.max(0, maxWidthPx - minWidthPx);
  const finalWidthPx = minWidthPx + widthRange * (percent / 100);

  return (
    <div
      id="PDK"
      onClick={() => setClicked(clicked === "PDK" ? "" : "PDK")}
      ref={cardRef}
      className="group h-16 w-full rounded overflow-hidden bg-[rgb(238,241,255)] cursor-pointer border border-white flex items-center justify-between relative pr-4 pl-10"
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
              width: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
            animate={{
              width: [0, finalWidthPx],
              transition: {
                type: "tween",
                duration: 0.75,
                ease: "easeInOut",
              },
            }}
            className="h-full absolute top-0 right-0 z-20 max-w-[940px]"
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
              className="font-bold text-4xl absolute top-1/2 -translate-y-1/2"
              style={{left: ((Number(party.numberOfVoting) / 1000000) * 100).toFixed() > 99 ? "-5.5rem" : ((Number(party.numberOfVoting) / 1000000) * 100).toFixed() > 9 ? "-4.5rem" : "-3.5rem"}}
            >
              <span className="text-2xl font-normal">%</span>{((Number(party.numberOfVoting) / 1000000) * 100).toFixed()}
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
          x: clicked ? "100%" : 0,
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

        <div className="flex flex-col-reverse items-center w-3/12 justify-center">
          <p>مقعد</p>
          <p className="font-black text-3xl">
            {party.thisYearChairs > 9
              ? party.thisYearChairs
              : `0${party.thisYearChairs}`}
          </p>
        </div>

        <div className="flex flex-col-reverse items-center w-3/12 justify-center">
          <p>صوت</p>
          <p className="font-black text-3xl">{party.numberOfVoting}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PartyCard;
