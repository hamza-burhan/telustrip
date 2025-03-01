import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "/assets/images/icons/dollar.svg",
      title: "Best Price Guarantee",
      description: "We offer the lowest prices with exclusive discounts.",
    },
    {
      icon: "/assets/images/icons/clock.svg",
      title: "24/7 Customer Support",
      description: "Our support team is available around the clock.",
    },
    {
      icon: "/assets/images/icons/lock.svg",
      title: "Secure Payments",
      description: "We use top-notch security for safe transactions.",
    },
    {
      icon: "/assets/images/icons/plane.svg",
      title: "Easy Booking",
      description: "Simple and fast flight booking in just a few clicks.",
    },
  ];

  return (
    <section className="why-choose-us text-center">
      <div className="container pt-4">
        <h2 className="mb-4">Why Choose Us?</h2>
        <p className="mb-4">
          Experience the best flight booking service with unbeatable benefits.
        </p>
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-3" key={index}>
              <div className="icon-box p-4">
                <Image
                  className="mb-2"
                  src={feature.icon}
                  alt="icon-feature"
                  width={32}
                  height={32}
                />
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
