"use client";

import FlightSection from "./FlightSection";
import KeepInTouch from "./KeepInTouch";
import Landing from "./Landing";
import TrustedConnections from "./TrustedConnections";
import WhyChooseUs from "./WhyChooseUs";

export default function Main() {
  return (
    <>
      <Landing />
      <FlightSection />
      <WhyChooseUs />
      <TrustedConnections />
      <KeepInTouch />
    </>
  );
}
