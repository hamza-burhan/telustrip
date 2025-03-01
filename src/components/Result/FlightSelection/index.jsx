import React from "react";

const FlightSelection = () => {
  const flights = [
    { date: "Fri, 6 Jun", price: "PKR 183,668" },
    { date: "Sat, 7 Jun", price: "PKR 187,578" },
    { date: "Sun, 8 Jun", price: "PKR 183,668" },
    { date: "Mon, 9 Jun", price: "PKR 172,198", active: true },
    { date: "Tue, 10 Jun", price: "PKR 178,908" },
    { date: "Wed, 11 Jun", price: "PKR 172,198" },
    { date: "Thu, 12 Jun", price: "PKR 178,908" },
  ];

  return (
    <div className="flight-selection">
      <h2 className="date">Mon, 9 Jun 2025</h2>
      <h1 className="title">
        Select your departure flight from{" "}
        <span className="highlight">Lahore</span> to{" "}
        <span className="highlight">Islamabad</span>
      </h1>
      <div className="flight-list">
        {flights.map((flight, index) => (
          <div
            key={index}
            className={`flight-item ${flight.active ? "active" : ""}`}
          >
            <p className="flight-date">{flight.date}</p>
            <p className="flight-price">{flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSelection;
