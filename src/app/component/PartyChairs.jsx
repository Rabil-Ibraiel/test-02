"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getParties } from "../actions/getParties";

const PartyChairs = () => {
  const [click, setClick] = React.useState("");
  const [parties, setParties] = React.useState([]);

  useEffect(() => {
    getParties().then((data) => {
      setParties(data);
    });
  }, []);

  const [hovered, setHovered] = React.useState(null);
  return (
    <div className="w-full h-12 overflow-x-scroll overflow-y-clip hide-scrollbar flex items-center mb-12 relative text-[rgb(26,40,107)]">
      <>
        <div
          style={{ display: click ? "none" : "flex", width: "100%" }}
          className="flex-1"
        >
          {parties.map((party) => (
            <div
              key={party.abbr}
              onClick={() => setClick(party.abbr)}
              onMouseEnter={() => setHovered(party.abbr)}
              onMouseLeave={() => setHovered(null)}
              className="min-w-3/12 h-12 group transition-all duration-300 cursor-pointer flex items-center justify-center  relative bg-[rgb(211,215,233)] even:bg-[rgb(238,241,255)]"
              style={{
                background: hovered === party.abbr && party.color,
              }}
            >
              <div
                style={{ backgroundColor: party.color }}
                className="w-full h-1  absolute top-0 left-0"
              ></div>
              <p className="text-xl font-bold text-center group-hover:hidden group-hover:opacity-0 block opacity-100">
                {party.arabicName}
              </p>
              <p className="w-full text-3xl text-center font-bold group-hover:block group-hover:opacity-100 hidden opacity-0 text-white">
                30
              </p>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {click && (
            <motion.div
              key={click}
              onClick={() => setClick("")}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-full overflow-hidden flex items-center absolute top-0 left-0 z-10 cursor-pointer"
            >
              {/* Column 1 */}
              <div className="w-[35%] h-full flex items-center justify-center  bg-[rgb(255,194,41)]">
                <h3 className="text-2xl font-black">
                  {parties.filter((p) => p.abbr === click)[0].arabicName}
                </h3>
              </div>

              {/* Column 2 */}
              <div className="w-[20%] h-full flex items-center justify-between px-4  bg-linear-to-t from-[rgb(255,194,41)] to-[rgb(250,209,126)] text-2xl font-bold">
                <h4 className="flex gap-2">
                  <p>
                    {parties.filter((p) => p.abbr === click)[0].thisYearChairs}
                  </p>
                  <p className="pt-[3px]">مقعدا</p>
                </h4>
                <p>2025</p>
              </div>

              {/* Divider */}
              <div className="divider w-2 h-full bg-linear-to-t from-[rgb(255,194,41)] to-[rgb(255,194,41)]" />

              {/* Column 3 */}
              <div className="w-[20%] h-full flex items-center justify-between px-4  bg-linear-to-t from-[rgb(255,194,41)] to-[rgb(250,209,126)] text-2xl font-bold">
                <h4 className="flex gap-2">
                  <p>
                    {parties.filter((p) => p.abbr === click)[0].lastYearChairs}
                  </p>
                  <p className="pt-[3px]">مقعدا</p>
                </h4>
                <p>2024</p>
              </div>

              {/* Column 4 */}
              <div className="w-[30%] h-full flex items-center justify-center  bg-[rgb(64,104,165)] text-white text-2xl font-bold">
                <h4 className="flex gap-2">
                  <p className="font-black">
                    {parties.filter((p) => p.abbr === click)[0].numberOfVoting}
                  </p>
                  <p className="pt-[3px]">صوت</p>
                </h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </div>
  );
};

export default PartyChairs;
