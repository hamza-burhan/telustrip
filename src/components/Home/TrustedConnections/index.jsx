import React from "react";
import Image from "next/image";

const TrustedConnections = () => {
  const partners = [
    { name: "Google", logo: "/assets/images/logo/pia-logo.png" },
    { name: "Apple", logo: "/assets/images/logo/apple-logo.png" },
    { name: "Microsoft", logo: "/assets/images/logo/microsoft-logo.png" },
    { name: "Amazon", logo: "/assets/images/logo/amazon-logo.png" },
    { name: "Meta", logo: "/assets/images/logo/meta-logo.png" },
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
