import Image from "next/image";
import Subscription from "./Subscription";

const KeepInTouch = () => {
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
          <Subscription />
        </div>
      </div>
    </div>
  );
};

export default KeepInTouch;
