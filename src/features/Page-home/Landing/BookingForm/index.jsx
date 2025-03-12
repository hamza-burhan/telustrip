import { useState } from "react";
import FlightBookingForm from "./FlightBookingForm";

export const BookingForm = () => {
  const [activeTab, setActiveTab] = useState("Flight");

  return (
    <div className="container booking-form">
      <nav>
        <div className="nav nav-tabs" role="tablist">
          {["Flight", "Stop Over", "Ticket"].map((tab) => (
            <button
              key={tab}
              className={`nav-link booking-tabs ${
                activeTab === tab ? "active-tab" : ""
              }`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="tab-content">
        {activeTab === "Flight" && <FlightBookingForm />}

        {activeTab === "Stop Over" && (
          <div className="tab-pane" id="nav-stop-over">
            <h4>Stop Over Details</h4>
          </div>
        )}

        {activeTab === "Ticket" && (
          <div className="tab-pane" id="nav-ticket">
            <h4>Ticket Details</h4>
          </div>
        )}
      </div>
    </div>
  );
};
