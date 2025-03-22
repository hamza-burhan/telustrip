import { useState, useRef, useEffect, useCallback } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Calendar } from "react-date-range";
import { PassengerSelector } from "../PassengerSelector";
import { useRouter } from "next/navigation";
import airportData from '../../../../../data/airports.json';
import styles from './FlightBooking.module.css';

const FlightBookingForm = () => {
  const [flightType, setFlightType] = useState("Return");
  const [flights, setFlights] = useState([{ from: "", to: "", fromCode: "", toCode: "", departureDate: new Date() }]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showCalendarIndex, setShowCalendarIndex] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Return date defaults to 7 days later
      key: "selection"
    },
  ]);
  const router = useRouter();
  const calendarRef = useRef(null);
  const [searchType, setSearchType] = useState("");
  const dropdownRef = useRef(null);
  const getNearestAirport = (latitude, longitude, airportData) => {
    let nearestAirport = null;
    let minDistance = Infinity;
  
    airportData.forEach((airport) => {
      const distance = Math.sqrt(
        Math.pow(airport.lat - latitude, 2) + Math.pow(airport.lon - longitude, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestAirport = airport;
      }
    });
  
    return nearestAirport;
  };
  const handleClickOutside = useCallback((event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendarIndex(null);
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const nearestAirport = getNearestAirport(latitude, longitude, airportData);
  
          if (nearestAirport) {
            setFlights((prevFlights) => {
              const updatedFlights = [...prevFlights];
              updatedFlights[0].from = `${nearestAirport.city} ${nearestAirport.code}`;
              updatedFlights[0].fromCode = nearestAirport.code;
              return updatedFlights;
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIndex(null);
      }
    };

    if (dropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownIndex]);

  useEffect(() => {
    if (flightType === "Multi-city" && flights.length === 1) {
      handleAddFlight();
    } else if (flightType === "One way" || flightType === "Return") {
      setFlights((prevFlights) => {
        // Keep only the first flight and preserve its departureDate
        const firstFlight = prevFlights[0] || {};
        return [
          {
            ...firstFlight, // Preserve existing data
            from: "",
            to: "",
            fromCode: "",
            toCode: "",
            departureDate: firstFlight.departureDate || new Date(), // Default to today
          },
        ];
      });
    }
  }, [flightType]);

  const handleAddFlight = () =>
    setFlights((prev) => [...prev, { from: "", to: "" }]);

  const handleRemoveFlight = (index) =>
    setFlights((prev) => prev.filter((_, i) => i !== index));

  const getFormattedDate = (date, formatStr) => format(date, formatStr);

  const handleCalendarChange = (index, date) => {
    const localDate = new Date(date);
    const formattedDate = localDate.toISOString().split("T")[0];
    setFlights((prev) => {
      const updatedFlights = [...prev];
      updatedFlights[index].departureDate = date;
      return updatedFlights;
    });
    setDepartureDate(date);
    setDateRange([{
      startDate: date,
      endDate: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000),
      key: "selection"
    }]);
    setShowCalendarIndex(null);
  };

  const handleSearchClick = () => {
    const submittedData = flights.map((flight) => ({
      from: flight.fromCode,
      to: flight.toCode,
      departureDate: flight.departureDate,
      fromCity: flight.from,
      toCity: flight.to,
    }));
    const query = submittedData.reduce((acc, flight, index) => {
      acc[`from${index}`] = flight.from;
      acc[`to${index}`] = flight.to;
      acc[`departureDate${index}`] = flight.departureDate?.toISOString() || "";
      acc[`fromCity${index}`] = flight.fromCity;
      acc[`toCity${index}`] = flight.toCity;
      return acc;
    }, {});
    router.push({
      pathname: "/flight-list",
      query,
    });
  };

  const handleInputChange = (index, field, value) => {
    setFlights((prev) => {
      const updatedFlights = [...prev];
      updatedFlights[index][field] = value;
      return updatedFlights;
    });

    setDropdownIndex(index);
    setSearchType(field);

    if (value) {
      let filteredList = airportData.filter(
        (airport) =>
          airport.name.toLowerCase().includes(value.toLowerCase()) ||
          airport.city.toLowerCase().includes(value.toLowerCase()) ||
          airport.code.toLowerCase().includes(value.toLowerCase())
      );

      // Exclude the selected "from" airport when choosing "to"
      if (field === "to") {
        filteredList = filteredList.filter(
          (airport) => airport.city !== flights[index].from
        );
      }

      setFilteredAirports(filteredList);
    } else {
      setFilteredAirports([]);
    }
    console.log('filteredAirports', getFormattedDate);
  };

  const handleSelectAirport = (index, field, airport) => {
    setFlights((prev) => {
      const updatedFlights = [...prev];
      updatedFlights[index][field] = `${airport.city} ${airport.code}`;
      updatedFlights[index][`${field}Code`] = airport.code;
      return updatedFlights;
    });

    setDropdownIndex(null);
  };

  const handleSwap = (index) => {
    setFlights((prev) =>
      prev.map((flight, i) =>
        i === index ? { ...flight, from: flight.to, to: flight.from } : flight
      )
    );
  };

  return (
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" role="tabpanel">
        <div className="row pb-3">
          <div className="d-flex gap-4 p-0">
            {["Return", "One way", "Multi-city"].map((option, index) => (
              <div className="form-check p-0" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flightType"
                  id={`flight-${index}`}
                  defaultChecked={index === 0}
                  onChange={() => setFlightType(option)}
                />
                <label className="form-check-label" htmlFor={`flight-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {flights.map((flight, index) => (
          <div
            className="row mb-3 align-items-center border-flight"
            key={index}
          >
            <div className="col-lg-2 p-0 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg border-0 flight-input"
                  id={`floatingInputFrom-${index}`}
                  placeholder="From"
                  value={flight.from}
                  onChange={(e) => handleInputChange(index, "from", e.target.value)}
                  onFocus={() => {
                    setDropdownIndex(index);
                    setSearchType("from");
                    setFilteredAirports(airportData.slice(0, 10));
                  }}
                />
                <label htmlFor={`floatingInputFrom-${index}`}>From</label>
              </div>
              {dropdownIndex === index && searchType === "from" && (
                <ul className={`dropdown-menu show ${styles.customDropdownMenu}`} ref={dropdownRef}>
                  {filteredAirports.map((airport) => (
                    <li
                      key={airport.code}
                      className={`dropdown-item ${styles.customDropdownItem}`}
                      onClick={() => handleSelectAirport(index, "from", airport)}
                    >
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex flex-column">
                          <span className="location-dropdown">{airport.city}</span>
                          <span>{airport.country}</span>
                        </div>
                        <div className={`d-flex flex-column ${styles.textEnd}`}>
                          <span className="location-dropdown">{airport.code}</span>
                          <span>{airport.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-lg-auto text-center">
              <button
                type="button"
                className="btn rounded-circle p-2 swap-btn"
                onClick={() => handleSwap(index)}
              >
                <i className="fas fa-exchange-alt purple-color"></i>
              </button>
            </div>
            <div className="col-lg-2 p-0 position-relative">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control form-control-lg border-0 flight-input"
                  id={`floatingInput-${index}`}
                  placeholder="To"
                  value={flight.to}
                  onChange={(e) => handleInputChange(index, "to", e.target.value)}
                  onFocus={() => {
                    setDropdownIndex(index);
                    setSearchType("to");
                    setFilteredAirports(airportData.slice(0, 10));
                  }}
                />
                <label htmlFor={`floatingInput-${index}`}>To</label>
              </div>

              {dropdownIndex === index && searchType === "to" && (
                <ul className={`dropdown-menu show ${styles.customDropdownMenu}`} ref={dropdownRef}>
                  {filteredAirports.map((airport) => (
                    <li
                      key={airport.code}
                      className={`dropdown-item ${styles.customDropdownItem}`}
                      onClick={() => handleSelectAirport(index, "to", airport)}
                    >
                      <div className="d-flex justify-content-between w-100">
                        <div className="d-flex flex-column">
                          <strong>{airport.city}</strong>
                          <span>{airport.country}</span>
                        </div>
                        <div className={`d-flex flex-column ${styles.textEnd}`}>
                          <strong>{airport.code}</strong>
                          <span>{airport.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-lg-3 d-flex position-relative">
              <div className="date-picker-wrapper position-relative form-floating">
                <input
                  type="text"
                  readOnly
                  value={
                    flights[index].departureDate
                      ? getFormattedDate(flights[index].departureDate, "dd MMM yyyy")
                      : ""
                  }
                  className="date-picker-input form-control form-control-lg border-0 flight-input"
                  id={`floatingDeparture-${index}`}
                  placeholder="Select Date"
                  onClick={() =>
                    setShowCalendarIndex(index === showCalendarIndex ? null : index)
                  }
                />
                <label htmlFor={`floatingDeparture-${index}`}>Departure</label>
              </div>

              {flightType === "Return" && (
                <div className="date-picker-wrapper position-relative form-floating">
                  <input
                    type="text"
                    readOnly
                    value={getFormattedDate(dateRange[0].endDate, "dd MMM yyyy")}
                    className="date-picker-input form-control form-control-lg border-0 flight-input"
                    id={`floatingReturn-${index}`}
                    placeholder="Select Date"
                    onClick={() =>
                      setShowCalendarIndex(index === showCalendarIndex ? null : index)
                    }
                  />
                  <label htmlFor={`floatingReturn-${index}`}>Return</label>
                </div>
              )}

              {showCalendarIndex === index && (
                <div
                  ref={calendarRef}
                  className="calendar-wrapper position-absolute z-9999 bg-white p-3 shadow rounded"
                >
                  {flightType === "One way" || flightType === "Multi-city" ? (
                    <Calendar
                      date={departureDate}
                      onChange={(date) => handleCalendarChange(index, date)}
                      minDate={new Date()}
                    />
                  ) : (
                    <DateRange
                      ranges={dateRange}
                      onChange={(item) => {
                        setDateRange([item.selection]);
                        // Update departure date in flights state
                        setFlights((prevFlights) => {
                          const updatedFlights = [...prevFlights];
                          if (updatedFlights.length > 0) {
                            updatedFlights[0].departureDate = item.selection.startDate;
                          }
                          return updatedFlights;
                        });
                      }}
                      minDate={new Date()}
                      rangeColors={["#2b2355"]}
                    />
                  )}
                  {flightType === "Return" && (
                    <button
                      className="confirm-btn w-100 mt-2"
                      onClick={() => setShowCalendarIndex(null)}
                    >
                      Confirm Dates
                    </button>
                  )}
                </div>
              )}
            </div>

            {index !== 0 && index !== 1 && (
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveFlight(index)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            )}

            {index === 0 && <PassengerSelector />}
          </div>
        ))}

        {flightType === "Multi-city" && (
          <button className="btn-add-flight" onClick={handleAddFlight}>
            + Add Flight
          </button>
        )}

        <div className="col-12">
          <div className="text-end mt-4">
            <button
              type="button"
              className="search-btn"
              onClick={handleSearchClick}
            >
              Search Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingForm;
