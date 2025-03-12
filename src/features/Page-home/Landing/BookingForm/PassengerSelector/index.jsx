import { useState, useEffect, useRef } from "react";

export const PassengerSelector = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [tempAdults, setTempAdults] = useState(1);
  const [tempChildren, setTempChildren] = useState(0);
  const [tempInfants, setTempInfants] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const totalPassengers = adults + children + infants;

  const adjustTempCount = (type, change) => {
    if (type === "adults") setTempAdults((prev) => Math.max(1, prev + change));
    if (type === "children")
      setTempChildren((prev) => Math.max(0, prev + change));
    if (type === "infants")
      setTempInfants((prev) => Math.max(0, prev + change));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleConfirm = () => {
    setAdults(tempAdults);
    setChildren(tempChildren);
    setInfants(tempInfants);
    setDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="col-lg-4 position-relative passenger-dropdown"
      ref={dropdownRef}
    >
      <div
        className="form-control form-control-lg border-0 d-flex align-items-center"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        style={{ cursor: "pointer" }}
        title={`${adults} Adult${adults > 1 ? "s" : ""}, ${children} Child${
          children !== 1 ? "ren" : ""
        }, ${infants} Infant${
          infants !== 1 ? "s" : ""
        } - ${totalPassengers} Passengers`}
      >
        <i className="fas fa-user me-2 text-muted"></i>
        <span className="truncate-text">
          {adults} Adult{adults > 1 ? "s" : ""}, {children} Child
          {children !== 1 ? "ren" : ""}, {infants} Infant
          {infants !== 1 ? "s" : ""} - {totalPassengers} Passengers
        </span>
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu p-3 show" style={{ minWidth: "280px" }}>
          {[
            {
              label: "Adults",
              desc: "12+ years",
              state: tempAdults,
              type: "adults",
            },
            {
              label: "Child",
              desc: "2-11 years",
              state: tempChildren,
              type: "children",
            },
            {
              label: "Infant",
              desc: "Under 2 years",
              state: tempInfants,
              type: "infants",
            },
          ].map(({ label, desc, state, type }) => (
            <div className="d-flex justify-content-between mb-3" key={type}>
              <div>
                <span className="d-block">{label}</span>
                <small className="text-muted">{desc}</small>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => adjustTempCount(type, -1)}
                >
                  -
                </button>
                <span className="btn">{state}</span>
                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => adjustTempCount(type, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};
