import { useState } from "react";
import FlightSelection from "../../features/Page-flight-list/FlightSelection"
import FlightDetail from "../../features/Page-flight-list/FlightDetail"
import { useDataContext } from '../../contexts/DataContext';

export default function Result() {
  const [activeDate, setActiveDate] = useState("");
  const { setConfirm } = useDataContext();

  return (
    <>
      <FlightSelection activeDate={activeDate} setActiveDate={setActiveDate}  />
      <FlightDetail activeDate={activeDate} setConfirm={setConfirm} />
    </>
  );
}
