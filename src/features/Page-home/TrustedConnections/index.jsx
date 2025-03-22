import React from "react";
import Image from "next/image";

const TrustedConnections = () => {
  const partners = [
    { name: "PIA", logo: "/assets/images/logo/pia-logo.png" },
    { name: "Airblue", logo: "/assets/images/logo/airblue-logo.png" },
    { name: "Airsial", logo: "/assets/images/logo/airsial-logo.png" },
    { name: "Qatar", logo: "/assets/images/logo/qatar-logo.png" },
    { name: "Etihad", logo: "/assets/images/logo/etihad-logo.png" },
    { name: "Flyh Jinna", logo: "/assets/images/logo/flyjinnah-logo.png" },
  ];

  // Repeat logos multiple times for smoother looping
  const repeatedPartners = Array(100).fill(partners).flat();

  return (
    <div className="container pt-5 pb-5 text-center">
      <p className="light-color-text">Partner with Confidence</p>
      <h1 className="h1">Trusted Connections</h1>
      <div className="scroll-container">
        <div className="scroll-content">
          {repeatedPartners.map((partner, index) => (
            <div key={index} className="col-auto">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={150}
                height={150}
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedConnections;
