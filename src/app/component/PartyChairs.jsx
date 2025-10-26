"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getParties } from "../actions/getParties";

const PartyChairs = () => {
  const [click, setClick] = useState("");
  const [parties, setParties] = useState([]);
  // hover visual handled in CSS via a per-item CSS variable (no JS) to avoid layout shifts

  // ⬇️ Marquee refs & state
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);


  useEffect(() => {
    getParties().then((data) => setParties(data));
  }, []);

  // ⬇️ Marquee loop (true infinite, no gaps)
  useEffect(() => {
    if (!trackRef.current) return;
    let rafId;
    let last = performance.now();
    // Tune speed here (pixels per second)
    const SPEED = 60;
    const halfWidthRef = { current: 0 };
    const xRef = { current: 0 };

    const recalcHalf = () => {
      const track = trackRef.current;
      if (!track) return;
      halfWidthRef.current = track.scrollWidth / 2;
    };

    // initial calc
    recalcHalf();
    // recalc on resize to keep wrap width correct
    window.addEventListener("resize", recalcHalf);

    const step = (now) => {
      const dt = (now - last) / 1000; // seconds
      last = now;

      const track = trackRef.current;
      if (!track) {
        rafId = requestAnimationFrame(step);
        return;
      }
      // use internal xRef to avoid reading computed styles (prevents jumps)
      let x = xRef.current || 0;

      // 👉 Arabic direction: move RIGHT instead of LEFT
      if (!pausedRef.current) {
        x += SPEED * dt;
      }

      const halfWidth = halfWidthRef.current || track.scrollWidth / 2;

      // When we've moved a full copy width to the right, snap back left by that width
      // (only wrap when x >= halfWidth)
      if (halfWidth && x >= halfWidth) {
        x -= halfWidth;
      }

      xRef.current = x;
      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(step);
    };

    // Initialize transform to 0 to avoid inherited transforms
    trackRef.current.style.transform = "translateX(0px)";
    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", recalcHalf);
    };
  }, [parties]);

  // Duplicate for seamless loop (two copies back-to-back)
  const marqueeItems = [...parties, ...parties];

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      className="w-full lg:h-10 h-11 overflow-hidden flex items-center relative text-[rgb(26,40,107)] "
    >
      <>
        {/* ⬇️ Marquee track (shown only when not in 'click' detail view) */}
        <div
          style={{ width: "100%" }}
          className="flex-1 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div
            ref={trackRef}
            className="flex whitespace-nowrap will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {marqueeItems.map((party, i) => (
              <div
                key={`${party.abbr}-${i}`}
                onClick={() => {
                  // pause the marquee while the detail overlay is open
                  pausedRef.current = true;
                  setClick(party.abbr);
                }}
                className="h-12 group transition-all duration-300 cursor-pointer flex items-center justify-center relative bg-[#D3D7E9] even:bg-[#E9EBF4] min-w-[280px] max-w-[35vw] overflow-hidden"
                // Use a responsive minWidth so long Arabic names have room without breaking the marquee.
                // min(320px, 35%) -> at large sizes items will be at least 320px, on small screens they'll be at most 35%.
                style={{
                  ["--party-color"]: party.color,
                }}
              >
                {/* overlay uses the CSS variable; opacity toggled via CSS (no JS) */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-30"
                  style={{ background: "var(--party-color)" }}
                />
                <div
                  style={{ backgroundColor: party.color }}
                  className="w-full lg:h-2 h-1 absolute top-0 left-0"
                />
                <p className="text-xl font-bold text-center absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                  {party.arabicName}
                </p>
                <p className="w-full text-3xl text-center font-bold absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-white font-eloquia">
                  {party.thisYearChairs}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ⬇️ Your existing click overlay (unchanged) */}
        <AnimatePresence
          mode="wait"
          onExitComplete={() => (pausedRef.current = false)}
        >
          {click && (
            <motion.div
              key={click}
              onClick={() => setClick("")}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-full overflow-hidden rounded flex items-center absolute top-0 left-0 z-10 cursor-pointer"
            >
              {/* Column 1 */}
              <div className="w-[35%] h-full flex items-center justify-center text-center" style={{backgroundColor: parties.filter((p) => p.abbr === click)[0]?.color}}>
                <h3 className="lg:text-2xl text-white text-lg font-bold leading-5 pb-1">
                  {parties.filter((p) => p.abbr === click)[0]?.arabicName}
                </h3>
              </div>

              {/* Column 2 */}
              <div className="lg:w-[20%] w-[22%] h-full flex items-center justify-between lg:px-4 md:px-3 sm:px-2 lg:text-2xl text-lg font-bold text-white" style={{backgroundColor: parties.filter((p) => p.abbr === click)[0]?.color}} >
                <h4 className="flex items-baseline lg:gap-2 md:gap-1 gap-0.5">
                  <p className="digits font-eloquia lg:text-2xl text-lg font-bold mr-1">
                    {parties.filter((p) => p.abbr === click)[0]?.thisYearChairs}
                  </p>
                  <p className="font-bold">مقعدا</p>
                </h4>
                <p className="digits font-eloquia lg:lg:text-2xl text-lg font-bold mr-1.5">2025</p>
              </div>

              {/* Divider */}
              <div className="divider w-2 h-full bg-white" />

              {/* Column 3 */}
              <div style={{backgroundColor: parties.filter((p) => p.abbr === click)[0]?.color}} className="lg:w-[20%] w-[22%] h-full flex items-center justify-between lg:px-4 md:px-3 sm:px-2 text-white lg:text-2xl text-lg" >
                <h4 className="flex items-baseline lg:gap-2 md:gap-1 gap-0.5">
                  <p className="digits font-eloquia lg:text-2xl text-lg font-bold">
                    {parties.filter((p) => p.abbr === click)[0]?.lastYearChairs}
                  </p>
                  <p className="font-bold">مقعدا</p>
                </h4>
                <p className="digits font-eloquia lg:text-2xl text-lg font-bold mr-1.5">2021</p>
              </div>

              {/* Column 4 */}
              <div className="lg:w-[30%] w-[21%] h-full flex items-center justify-center bg-[rgb(64,104,165)] text-white lg:text-2xl text-lg ">
                <h4 className="flex gap-2">
                  <p className="font-bold font-eloquia">
                    {parties.filter((p) => p.abbr === click)[0]?.numberOfVoting}
                  </p>
                  <p className="font-semibold">صوت</p>
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
