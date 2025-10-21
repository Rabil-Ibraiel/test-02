"use client";
import React, { useState } from "react";
import SvgIcon from "./ComplexShape";
import PartyVotesWrapper from "./PartyVotesWrapper";

const PartiesRegionWrapper = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className="w-full lg:h-[380px] md:h-[340px] flex md:flex-row flex-col  gap-2 overflow:hidden mb-12">
      <div className="lg:w-1/3 md:w-4/12 rounded overflow-hidden">
        <SvgIcon selected={selected} setSelected={setSelected} />
      </div>
      <PartyVotesWrapper selectedRegion={selected} />
    </div>
  );
};

export default PartiesRegionWrapper;
