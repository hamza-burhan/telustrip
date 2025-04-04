import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  FaExchangeAlt,
  FaTimesCircle,
  FaSuitcase,
  FaShoppingBag,
  FaChair,
  FaArrowUp,
} from "react-icons/fa";
import { useRouter } from "next/router";
import Offcanvas from 'react-bootstrap/Offcanvas';

const Economybenefits = [
  {
    text: "Flexibility to make 1 change",
    icon: <FaExchangeAlt />,
  },
  {
    text: "Cancellation within 24hrs of booking without fees",
    icon: <FaTimesCircle />,
  },
  {
    text: "Hand baggage: 1 piece, 7 kg",
    icon: <FaShoppingBag />,
  },
  {
    text: "Standard Seat selection included",
    icon: <FaChair />,
  },
  {
    text: "Preferred Seat selection for a fee",
    icon: <FaChair />,
  },
  { text: "Upgrade with Avios", icon: <FaArrowUp /> },
]
const Businessbenefits = [
  {
    text: "Flexibility to make unlimited changes",
    icon: <FaExchangeAlt />,
  },
  {
    text: "Cancel at anytime without fees",
    icon: <FaTimesCircle />,
  },
  { text: "Checked baggage: 35 kg", icon: <FaSuitcase /> },
  {
    text: "Hand baggage: 1 piece, 7 kg",
    icon: <FaShoppingBag />,
  },
  {
    text: "Standard Seat selection included",
    icon: <FaChair />,
  },
  {
    text: "Preferred Seat selection included",
    icon: <FaChair />,
  },
  { text: "Upgrade with Avios", icon: <FaArrowUp /> },
]

const flightDetails = {
  Economy: {
    title: "Great flexibility",
    fareType: "Economy Convenience",
    price: "224,106",
    avios: "2,149 Avios",
    Economybenefits: [
      {
        text: "Flexibility to make 1 change",
        icon: <FaExchangeAlt />,
      },
      {
        text: "Cancellation within 24hrs of booking without fees",
        icon: <FaTimesCircle />,
      },
      { text: "Checked baggage: 30 kg", icon: <FaSuitcase /> },
      {
        text: "Hand baggage: 1 piece, 7 kg",
        icon: <FaShoppingBag />,
      },
      {
        text: "Standard Seat selection included",
        icon: <FaChair />,
      },
      {
        text: "Preferred Seat selection for a fee",
        icon: <FaChair />,
      },
      { text: "Upgrade with Avios", icon: <FaArrowUp /> },
    ],
  },
  Business: {
    title: "Unlimited flexibility",
    fareType: "Economy Comfort",
    price: "305,106",
    avios: "2,866 Avios",
    Businessbenefits: [
      {
        text: "Flexibility to make unlimited changes",
        icon: <FaExchangeAlt />,
      },
      {
        text: "Cancel at anytime without fees",
        icon: <FaTimesCircle />,
      },
      { text: "Checked baggage: 35 kg", icon: <FaSuitcase /> },
      {
        text: "Hand baggage: 1 piece, 7 kg",
        icon: <FaShoppingBag />,
      },
      {
        text: "Standard Seat selection included",
        icon: <FaChair />,
      },
      {
        text: "Preferred Seat selection included",
        icon: <FaChair />,
      },
      { text: "Upgrade with Avios", icon: <FaArrowUp /> },
    ],
  },
};



const FlightPriceCard = ({ label, price, onClick }) => (
  <div className="economy-card " onClick={onClick}>
    <p className="economy-label">{label}</p>
    <p className="economy-value">
      PKR <span>{price}</span>
    </p>
  </div>
);

const FlightDetail = () => {
  const [expanded, setExpanded] = useState(null);
  const expandedRef = useRef(null);
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const [queryParams, setQueryParams] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (flight) => {
    console.log(" flight:", flight)
    setSelectedFlight(flight);
    setShow(true);
  } 

  const toggleExpand = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 200);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const flightData = Object.keys(router.query)
      .filter((key) => key.startsWith("from"))
      .map((key, index) => ({
        from: router.query[`from${index}`],
        to: router.query[`to${index}`],
        departureDate: router.query[`departureDate${index}`],
      }));
      const fetchFlights = async () => {
        try {
          const response = await fetch(
            `https://telustrip.tutorialsbites.com/api/sabre/flights?origin=${flightData[0].from}&destination=${flightData[0].to}&departure_date=${flightData[0].departureDate}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setFlights(data);
        } catch (err) {
        } 
      };
  
      fetchFlights();
    }
    
  }, [router.isReady]);

  return (
    <div>
      <div className="search-results-header">
        <div className="container">
          <div className="content">
            <div className="results-info">
              <h1>{flights.length} results</h1>
              <p>Fares displayed are for all passengers.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
      {flights.map((flight, index) => (
        <div
          key={index}
          className={`row flight-container p-6 ${expanded === index ? "expanded" : ""}`}
        >
          <div className="col-lg-6 mb-3">
            <div className="flight-info">
              <span className="qsuite">Qsuite</span>
              <Image
                src="/assets/images/info.svg"
                alt="info-icon"
                width={12}
                height={12}
              />
            </div>
            <div className="flight-schedule-container mt-4">
              <div className="flight-schedule">
                <div className="departure-time">{flight.departure_date.split(" ")[1]}</div>
                <div className="separator"></div>
                <div className="airline-info">
                  <Image
                    src="/assets/images/plane.png"
                    alt="Airline Logo"
                    width={20}
                    height={20}
                    className="airline-logo"
                  />
                </div>
                <div className="separator"></div>
                <div className="arrival-time">
                {flight.arrival_date.split(" ")[1]}<span className="next-day-indicator">+1</span>
                </div>
              </div>
            </div>
            <div className="flight-meta">
              {flight.connections?.length > 0 && (
                <>
                  <div className="airport-code">{flight.connections[0].departure.airport || "Unknown Airport"}</div>
                  <div className="stop-duration">{flight.flight_type}, {flight.total_travel_time}</div>
                  <div className="airport-code">{flight.connections[0].arrival.airport}</div>
                </>
              )}
            </div>

            <div className="mt-3">
              <a
                href="#"
                className="text-black"
                onClick={() => handleShow(flight)}
              >
                Flight Details
              </a>
            </div>
          </div>

          {/* Price Cards */}
          <div className="col-lg-3">
            <FlightPriceCard
              label="Economy"
              price={flight.total_fare.toLocaleString("en-PK")}
              onClick={() => toggleExpand(index)}
            />
          </div>
          <div className="col-lg-3">
            <FlightPriceCard
              label="Business"
              price={(flight.total_fare * 1.5).toLocaleString("en-PK")} // Example: 1.5x for business class
              onClick={() => toggleExpand(index)}
            />
          </div>

          {/* Expanded Content */}
          {expanded === index && (
            <div className="mt-4 col-lg-12 d-flex" ref={expandedRef}>
              <div className="col-lg-6 expanded-content">
                <h2>Economy</h2>
                <p className="price">PKR {flight.total_fare.toLocaleString("en-PK")}</p>
                <button className="select-fare-btn">Select fare</button>
                {/* <ul className="benefits-list">
                  <li>Free Baggage: {flight.baggage[0]?.weight || 0} {flight.baggage[0]?.unit}</li>
                  <li>Paid Baggage: {flight.baggage[1]?.pieces || 0} Piece(s)</li>
                </ul> */}
                <p className="avios">Earn 2,866 Avios</p>
                <ul className="benefits-list">
                  <li>
                    <FaSuitcase /> Checked baggage: {flight.baggage[0].weight} {flight.baggage[0].unit}
                  </li>
                  <li>
                    <FaSuitcase /> Type: {flight.baggage[0].type}
                  </li>
                  {Economybenefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6 expanded-content">
                <h2>Business</h2>
                <p className="price">PKR {(flight.total_fare * 1.5).toLocaleString("en-PK")}</p>
                <button className="select-fare-btn">Select fare</button>
                {/* <ul className="benefits-list">
                  <li>Free Baggage: {flight.baggage[0]?.weight || 0} {flight.baggage[0]?.unit}</li>
                  <li>Paid Baggage: {flight.baggage[1]?.pieces || 0} Piece(s)</li>
                </ul> */}
                <p className="avios">Earn 2,866 Avios</p>
                <ul className="benefits-list">
                  <li>
                    <FaSuitcase /> Checked baggage: {flight.baggage[1].weight} {flight.baggage[1].unit}
                  </li>
                  <li>
                    <FaSuitcase /> Type: {flight.baggage[1].type}
                  </li>
                  {Businessbenefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          )}
          <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={false} style={{width: '500px'}}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Flight Details</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h2 className="fw-bold">Lahore to Doha</h2>
              <p className="text-muted">{flight.arrival_date}</p>
              <div className="flight-schedule-container mt-4">
                <div className="flight-schedule">
                  <div className="departure-time">{flight.departure_date.split(" ")[1]}</div>
                  <div className="separator"></div>
                  <div className="airline-info">
                    <Image
                      src="/assets/images/plane.png"
                      alt="Airline Logo"
                      width={20}
                      height={20}
                      className="airline-logo"
                    />
                  </div>
                  <div className="separator"></div>
                  <div className="arrival-time">
                  {flight.arrival_date.split(" ")[1]}<span className="next-day-indicator">+1</span>
                  </div>
                </div>
              </div>
              <div className="flight-meta">
                {flight.connections?.length > 0 && (
                  <>
                    <div className="airport-code">{flight.connections[0].departure.airport || "Unknown Airport"}</div>
                    <div className="stop-duration">{flight.flight_type}, {flight.total_travel_time}</div>
                    <div className="airport-code">{flight.connections[0].arrival.airport}</div>
                  </>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ))}
        {/* <div
          className={`row flight-container p-6 ${expanded ? "expanded" : ""}`}
        >
          <div className="col-lg-4">
            <div className="flight-info">
              <span className="qsuite">Qsuite</span>
              <Image
                src="/assets/images/info.svg"
                alt="info-icon"
                width={12}
                height={12}
              />
            </div>
            <FlightSchedule />
            <div className="flight-meta">
              <div className="airport-code">LHE</div>
              <div className="stop-duration">1 Stop, 15h 55m</div>
              <div className="airport-code">ISB</div>
            </div>
          </div>

          <div className="col-lg-2"></div>

          <div className="col-lg-3">
            <FlightPriceCard
              label="Economy"
              price="224,106"
              onClick={() => toggleExpand("Economy")}
            />
          </div>
          <div className="col-lg-3">
            <FlightPriceCard
              label="Business"
              price="305,106"
              onClick={() => toggleExpand("Business")}
            />
          </div>
          {expanded && (
            <div className=" mt-4 col-lg-12 d-flex" ref={expandedRef}>
              <div className="col-lg-6 expanded-content">
                <h2>{flightDetails["Economy"].title}</h2>
                <h3>{flightDetails["Economy"].fareType}</h3>
                <p className="price">PKR {flightDetails["Economy"].price}</p>
                <button className="select-fare-btn">Select fare</button>
                <p className="avios">Earn {flightDetails["Economy"].avios}</p>
                <ul className="benefits-list">
                  {flightDetails["Economy"].benefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-6 expanded-content">
                <h2>{flightDetails["Business"].title}</h2>
                <h3>{flightDetails["Business"].fareType}</h3>
                <p className="price">PKR {flightDetails["Business"].price}</p>
                <button className="select-fare-btn">Select fare</button>
                <p className="avios">Earn {flightDetails["Business"].avios}</p>
                <ul className="benefits-list">
                  {flightDetails["Business"].benefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default FlightDetail;
