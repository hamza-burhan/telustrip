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
import Modal from 'react-bootstrap/Modal';
import styles from './FlightDetail.module.css';
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

const FlightPriceCard = ({ label, price, onClick }) => (
  <div className="economy-card " onClick={onClick}>
    <p className="economy-label">{label}</p>
    <p className="economy-value">
      PKR <span>{price}</span>
    </p>
  </div>
);

const FlightDetail = ({activeDate}) => {
  const [expanded, setExpanded] = useState(null);
  const expandedRef = useRef(null);
  const router = useRouter();
  const [flights, setFlights] = useState([]);
  const [queryParams, setQueryParams] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // const handleConfirm = () => {
  //   setShowModal(false);
  //   router.push("/confirm-details"); 
  // }
  // changes by abdul start
  const handleConfirm = async () => {
    setShowModal(false);
    
    if (selectedFlight) {
        console.log('Confirming flight:', selectedFlight);

        try {
            const response = await fetch('https://telustrip.tutorialsbites.com/api/sabre/revalidate-flight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DepartureDateTime: selectedFlight.departure_date, 
                    ArrivalDateTime: selectedFlight.arrival_date,
                    OriginLocationCode: selectedFlight.departure_airport,
                    DestinationLocationCode: selectedFlight.arrival_airport,
                    ClassOfService: 'Y',
                    FlightNumber: selectedFlight.flight_number,
                    FlightType: 'A',
                    AirlineCode: selectedFlight.airline
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Flight confirmed:', data);
            localStorage.setItem('flightData', JSON.stringify(data));
            router.push("/confirm-details");

        } catch (error) {
            console.error('Error confirming flight:', error);
        }
    }
};

  // changes by abdul end 


  const handleShowModal = (flight) => {
    console.log(" flight:", flight)
    setSelectedFlight(flight);
    setShowModal(true);
  }
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
  const formatActiveDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  useEffect(() => {
    if (router.isReady && activeDate) {
      const flightData = Object.keys(router.query)
      .filter((key) => key.startsWith("from"))
      .map((key, index) => ({
        from: router.query[`from${index}`],
        to: router.query[`to${index}`],
        departureDate: router.query[`departureDate${index}`],
      }));
      const fetchFlights = async () => {
        const formattedDate = formatActiveDate(activeDate);
        try {
          const response = await fetch(
            `https://telustrip.tutorialsbites.com/api/sabre/flights?origin=${flightData[0].from}&destination=${flightData[0].to}&departure_date=${formattedDate}`
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
    
  }, [router.isReady, activeDate]);

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
              <span className="qsuite">{flight.operating_airline}</span>
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
                {flight.arrival_date.split(" ")[1]}<span className="next-day-indicator">+{flight.connections.length}</span>
                </div>
              </div>
            </div>
            <div className="flight-meta">
              {flight.connections?.length > 0 && (
                <>
                  <div className="airport-code">{flight.connections[0].departure.airport || "Unknown Airport"}</div>
                  <div className="stop-duration">{flight.flight_type}, {flight.total_travel_time}</div>
                  <div className="airport-code">{flight.connections[flight.connections.length - 1].arrival.airport}</div>
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
          <div className="col-lg-6">
            <FlightPriceCard
              label="Economy"
              price={flight.total_fare.toLocaleString("en-PK")}
              onClick={() => toggleExpand(index)}
            />
          </div>
         

          {/* Expanded Content */}
          {expanded === index && (
            <div className="mt-4 col-lg-12 d-flex" ref={expandedRef}>
              <div className="col-lg-6 expanded-content">
                <h2>Economy</h2>
                <p className="price">PKR {flight.total_fare.toLocaleString("en-PK")}</p>
                <button className={styles.confirmFare} onClick={() => handleShowModal(flight)}>
                  Select Fare
                </button>
                <ul className="benefits-list">
                  <li>
                    <FaSuitcase /> Checked baggage: {flight.baggage[0].weight} {flight.baggage[0].unit}
                  </li>
                  <li>
                    <FaSuitcase /> Type: {flight.baggage[0].type}
                  </li>
                  {/* {Economybenefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))} */}
                </ul>
              </div>
              <div className="col-lg-6 expanded-content">
                <h2>Business</h2>
                <p className="price">Not Available</p>
                <button className={styles.confirmFare}>Select Fare</button>
                <ul className="benefits-list">
                  <li>
                    <FaSuitcase /> Checked baggage: {flight.baggage[1].weight} {flight.baggage[1].unit}
                  </li>
                  <li>
                    <FaSuitcase /> Type: {flight.baggage[1].type}
                  </li>
                  {/* {Businessbenefits.map((benefit, index) => (
                    <li key={index}>
                      {benefit.icon} {benefit.text}
                    </li>
                  ))} */}
                </ul>
              </div>
            </div>
          )}
          <Offcanvas show={show} onHide={handleClose} placement="end" backdrop={false} style={{width: '500px'}}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Flight Details</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {selectedFlight && (
                <>
                  <h2 className="fw-bold">{selectedFlight.departure_city} to {selectedFlight.arrival_city}</h2>
                  <p className="text-muted">{formatDate(selectedFlight.arrival_date)}</p>
                </>
              )}
                
              
              {selectedFlight && selectedFlight.connections.map((connection) => (
                <>
                  <div className="flight-schedule-container mt-4">
                    <div className="flight-schedule">
                      <div className="departure-time">{connection.departure.time.split(" ")[1]}</div>
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
                        {connection.arrival.time.split(" ")[1]}
                      </div>
                    </div>
                  </div>
                  <div className="flight-meta">
                      <>
                        <div className="airport-code vstack gap-2">
                          {connection.departure.city} 
                          <span className="text-muted">{connection.departure.city} Airport ({connection.departure.airport} ) </span>
                        </div>
                        <div className="stop-duration">{connection.airline}, {connection.duration}</div>
                        <div className="airport-code vstack gap-2">
                          {connection.arrival.city} 
                          <span className="text-muted">{connection.arrival.city} Airport ({connection.arrival.airport})</span>
                        </div>
                      </>
                  </div>
                </>
              ))}
            </Offcanvas.Body>
          </Offcanvas>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName={styles.confirmModal}
            aria-labelledby="example-custom-modal-styling-title"
            backdrop={false}
          >
            <Modal.Body>
              {selectedFlight && (
                <>
                  <div className="d-flex p-2 justify-content-between">
                    <div className="hstack gap-2">
                      <span>
                        <FaSuitcase />
                      </span>
                      <div className="vstack gap-2">
                        <span className="text-muted">Departure selected</span>
                        <h3>PKR {selectedFlight.total_fare}</h3>
                      </div>
                    </div>
                    <button className={styles.confirmFare} onClick={handleConfirm}>Confirm</button>
                  </div>
                </>
              )}
              
            </Modal.Body>
          </Modal>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FlightDetail;
