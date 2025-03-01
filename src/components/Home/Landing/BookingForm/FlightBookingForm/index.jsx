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
  const [flights, setFlights] = useState([{ from: "", to: "", fromCode: "", toCode: "", departureDate: null  }]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showCalendarIndex, setShowCalendarIndex] = useState(null);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const router = useRouter();
  const calendarRef = useRef(null);
  const [searchType, setSearchType] = useState("");
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendarIndex(null);
    }
  }, []);

  useEffect(() => {
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
      setFlights([{ from: "", to: "" }]);
    }
  }, [flightType]);

  const handleAddFlight = () =>
    setFlights((prev) => [...prev, { from: "", to: "" }]);

  const handleRemoveFlight = (index) =>
    setFlights((prev) => prev.filter((_, i) => i !== index));

  const getFormattedDate = (date, formatStr) => format(date, formatStr);

  const handleCalendarChange = (index, date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0]; 
    setFlights((prev) => {
      const updatedFlights = [...prev];
      updatedFlights[index].departureDate = formattedDate;
      return updatedFlights;
    });
    setDepartureDate(date);
    setShowCalendarIndex(null);
  };

  const handleSearchClick = () => {
    const submittedData = flights.map((flight) => ({
      from: flight.fromCode,
      to: flight.toCode,
      departureDate: flight.departureDate,
    }));
    console.log(submittedData);
    const query = submittedData.reduce((acc, flight, index) => {
      acc[`from${index}`] = flight.from;
      acc[`to${index}`] = flight.to;
      acc[`departureDate${index}`] = flight.departureDate;
      return acc;
    }, {});
    router.push({
      pathname: "/flight-results",
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
            <div className="col-lg-2 position-relative">
              <input
                type="text"
                className="form-control form-control-lg border-0 flight-input"
                placeholder="From"
                value={flight.from}
                onChange={(e) =>
                  handleInputChange(index, "from", e.target.value)
                }
                onFocus={() => {
                  setDropdownIndex(index);
                  setSearchType("from");
                  setFilteredAirports(airportData.slice(0, 10));
                }}
              />
              {dropdownIndex === index && searchType === "from" && (
                <ul className={`dropdown-menu show ${styles.customDropdownMenu}`} ref={dropdownRef}>
                  {filteredAirports.map((airport) => (
                    <li
                      key={airport.code}
                      className={`dropdown-item ${styles.customDropdownItem}`}
                      onClick={() =>
                        handleSelectAirport(index, "from", airport)
                      }
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

            <div className="col-lg-auto text-center">
              <button
                type="button"
                className="btn rounded-circle p-2 swap-btn"
                onClick={() => handleSwap(index)}
              >
                <i className="fas fa-exchange-alt dark-blue"></i>
              </button>
            </div>
            <div className="col-lg-2 position-relative">
              <input
                type="text"
                className="form-control form-control-lg border-0 flight-input"
                placeholder="To"
                value={flight.to}
                onChange={(e) => handleInputChange(index, "to", e.target.value)}
                onFocus={() => {
                  setDropdownIndex(index);
                  setSearchType("to");
                  setFilteredAirports(airportData.slice(0, 10));
                }}
              />
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
              <div className="date-picker-wrapper position-relative">
                <label className="date-picker-label mb-0">Departure</label>
                <input
                  type="text"
                  readOnly
                  value={
                    flights[index].departureDate
                      ? getFormattedDate(flights[index].departureDate, "dd MMM yyyy")
                      : ""
                  }
                  className="date-picker-input form-control form-control-lg border-0"
                  placeholder="Select Date"
                  onClick={() =>
                    setShowCalendarIndex(
                      index === showCalendarIndex ? null : index
                    )
                  }
                />
              </div>

              {flightType === "Return" && (
                <div className="date-picker-wrapper position-relative">
                  <label className="date-picker-label mb-0">Return</label>
                  <input
                    type="text"
                    readOnly
                    value={getFormattedDate(
                      dateRange[0].endDate,
                      "dd MMM yyyy"
                    )}
                    className="date-picker-input form-control form-control-lg border-0"
                    placeholder="Select Date"
                    onClick={() =>
                      setShowCalendarIndex(
                        index === showCalendarIndex ? null : index
                      )
                    }
                  />
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
                      onChange={(item) => setDateRange([item.selection])}
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
