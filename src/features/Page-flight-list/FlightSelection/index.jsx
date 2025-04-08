import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
const FlightSelection = ({ activeDate, setActiveDate }) => {
  const router = useRouter();
  const { query } = router;
  const [flights, setFlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // State to handle dynamic index

  const getQueryValue = (keyPrefix, index) => query[`${keyPrefix}${index}`] || '';

  const departureDate = getQueryValue('departureDate', currentIndex);
  const fromCity = getQueryValue('fromCity', currentIndex);
  const toCity = getQueryValue('toCity', currentIndex);

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
    if (departureDate) {
      setActiveDate(formattedDate);
      const generatedFlights = generateDateArray(departureDate, 3, 3);
      setFlights(generatedFlights);
    }
  }, [departureDate, currentIndex]);

  const handleDateClick = (date) => {
    setActiveDate(date);
  };

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
    setActiveDate('');
  };

  return (
    <div className="flight-selection">
      <h2 className="date">{activeDate}</h2>
      <h1 className="title">
        Select your departure flight <br />
        from <span className="highlight">{fromCity.split(' ')[0]}</span> to{' '}
        <span className="highlight">{toCity.split(' ')[0]}</span>
      </h1>
      <div className="flight-list">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`flight-item ${flight.date === activeDate ? 'active' : ''}`}
            onClick={() => handleDateClick(flight.date)}
          >
            <p className="flight-date">{flight.date}</p>
          </div>
        ))}
      </div>
      {/* <div className="index-navigation">
        <button disabled={currentIndex <= 0} onClick={() => handleIndexChange(currentIndex - 1)}>
          Previous Flight
        </button>
        <button onClick={() => handleIndexChange(currentIndex + 1)}>Next Flight</button>
      </div> */}
    </div>
  );
};


export default FlightSelection;
