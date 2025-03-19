import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
const FlightSelection = ({ activeDate, setActiveDate }) => {
  const router = useRouter();
  const { query } = router;
  const [flights, setFlights] = useState([]);

  const departureDate = query.departureDate0; 

  // Function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  const formattedDate = formatDate(departureDate);


  const generateDateArray = (baseDate, daysBefore, daysAfter) => {
    const base = new Date(baseDate);
    const dates = [];

    // Generate previous dates
    for (let i = daysBefore; i > 0; i--) {
      const date = new Date(base);
      date.setDate(base.getDate() - i);
      dates.push(formatDate(date));
    }

    // Add the base date
    dates.push(formatDate(base));

    // Generate future dates
    for (let i = 1; i <= daysAfter; i++) {
      const date = new Date(base);
      date.setDate(base.getDate() + i);
      dates.push(formatDate(date));
    }

    return dates.map((date) => ({
      date,
    }));
  };

  useEffect(() => {
    if (query.departureDate0) {
      setActiveDate(formatDate(new Date(query.departureDate0)));
      const generatedFlights = generateDateArray(query.departureDate0, 3, 3);
      setFlights(generatedFlights);
    }
  }, [query.departureDate0]);

  const handleDateClick = (date) => {
    setActiveDate(date);
  };

  
  return (
    <div className="flight-selection">
      <h2 className="date">{activeDate}</h2>
      <h1 className="title">
        Select your departure flight <br></br> from{" "}
        <span className="highlight">{query.fromCity0 ? query.fromCity0.split(' ')[0] : ''}</span> to{" "}
        <span className="highlight">{query.toCity0 ? query.toCity0.split(' ')[0] : ''}</span>
      </h1>
      <div className="flight-list">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`flight-item ${flight.date === activeDate ? "active" : ""}`}
            onClick={() => handleDateClick(flight.date)}
          >
            <p className="flight-date">{flight.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSelection;
