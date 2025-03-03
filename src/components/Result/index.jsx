"use client";
import React from "react";
import FlightSelection from "./FlightSelection";
import FlightDetail from "./FlightDetail";
import { useState } from "react";


const ResultDetail = () => {
  const [activeDate, setActiveDate] = useState("");
  return (
    <>
      <FlightSelection activeDate={activeDate} setActiveDate={setActiveDate} />
      <FlightDetail activeDate={activeDate} />
    </>
  );
};

export default ResultDetail;
