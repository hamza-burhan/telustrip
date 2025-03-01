import React from "react";

const flights = [
  {
    image: "/assets/images/featured-section/four.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
  {
    image: "/assets/images/featured-section/three.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
  {
    image: "/assets/images/featured-section/one.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
  {
    image: "/assets/images/featured-section/two.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
  {
    image: "/assets/images/featured-section/three.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
  {
    image: "/assets/images/featured-section/four.jpg",
    city: "Zagreb",
    price: "PKR 226630",
    dates: "11 Mar 2025 - 17 Mar 2025",
  },
];

const FlightSection = () => {
  return (
    <div className="container pt-5">
      <p className="light-color-text">Explore the Advantages</p>
      <h1 className="h1">Start planning your next trip</h1>
      <p className="light-gray-color-text">
        Experience a new era of air travel with our comprehensive flight booking
        solutions
      </p>
      <div className="container mt-5 mb-5">
        <div className="row">
          {flights.map((flight, index) => (
            <div
              key={index}
              className={`col-12 col-md-${index < 2 ? "6" : "3"} pb-4`}
            >
              <div
                className="flight-card"
                style={{ backgroundImage: `url(${flight.image})` }}
              >
                <div className="details">
                  <h5>{flight.city}</h5>
                  <p>
                    Economy from <strong>{flight.price}</strong>
                  </p>
                  <p>{flight.dates}</p>
                </div>
                <a href="#" className="book-btn">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSection;
