"use client";

import { useState } from "react";
import Image from "next/image";

const Subscription = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="subscription-wrapper">
      <div className="subscription-image">
        <Image
          src={"/assets/images/subscription-logo.jpg"}
          alt="Background"
          fill style={{ objectFit: "cover" }}
        />
      </div>
      <div className="subscription-content">
        <h2>Never miss an offer</h2>
        <p>Subscribe and be the first to receive our exclusive offers.</p>
        <div className="subscription-inputs">
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Preferred city of departure" />
        </div>
        <div className="subscription-checkbox">
          <input
            type="checkbox"
            id="subscribe"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="subscribe">
            I would like to get offers and news from Qatar Airways. I have read
            and understood the <a href="#">privacy notice</a>.
          </label>
        </div>
        <button className="subscription-button">Subscribe</button>
      </div>
    </div>
  );
};

export default Subscription;
