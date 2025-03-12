import Image from "next/image";
import { useState } from "react";
const KeepInTouch = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="container my-5">
      <div className="row align-items-center gap-4 gap-lg-0">
        <div className="col-lg-4 text-center text-md-start align-items-center align-items-lg-start flex-column  justify-content-center justify-content-md-start d-flex">
          <h4 className="fw-bold">Keep in touch...</h4>
          <hr className="w-25" />
          <p>
            Follow us to receive exclusive deals and all our latest news and
            offers.
          </p>
          <div className="social-icons d-flex justify-content-center justify-content-md-start gap-3">
            <a href="#" className="icon icon-facebook"></a>
            <a href="#" className="icon icon-twitter"></a>
            <a href="#" className="icon icon-linkedin"></a>
            <a href="#" className="icon icon-youtube"></a>
            <a href="#" className="icon icon-instagram"></a>
          </div>
        </div>

        {/* <div className="col-md-1 d-none d-md-block">
          <div className="border-end h-100"></div>
        </div> */}

        <div className="col-lg-8 text-center text-md-start">
          <div className="subscription-wrapper">
            <div className="subscription-image">
              <Image
                src={"/assets/images/subscription-logo.jpg"}
                alt="Background"
                layout="fill"
                objectFit="cover"
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
        </div>
      </div>
    </div>
  );
};

export default KeepInTouch;
