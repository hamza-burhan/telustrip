import Landing from "@/features/Page-home/Landing";
import FlightSection from "@/features/Page-home/FlightSection";
import WhyChooseUs from "@/features/Page-home/WhyChooseUs";
import TrustedConnections from "@/features/Page-home/TrustedConnections";
import KeepInTouch from "@/features/Page-home/KeepInTouch";

export default function Home() {
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
