"use client";
import React, { useState } from "react";
import SvgIcon from "./ComplexShape";
import PartyVotesWrapper from "./PartyVotesWrapper";

const PartiesRegionWrapper = () => {
  const [selected, setSelected] = useState("");
  return (
    <div className="w-full h-[380px] flex gap-2 overflow:hidden mb-12">
      <div className="w-1/3 rounded overflow-hidden">
        <SvgIcon selected={selected} setSelected={setSelected} />
      </div>
      <PartyVotesWrapper selectedRegion={selected}/>
    </div>
  );
};

export default PartiesRegionWrapper;
