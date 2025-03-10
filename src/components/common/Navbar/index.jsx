import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = ({isFixed }) => {
  const router = useRouter();
  const [isMainRoute, setIsMainRoute] = useState(false);
  const menuItems = ["Explore", "Book", "Experience", "Privilege Club"];
  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
  ];

  useEffect(() => {
    // Check if the current route is the main route
    setIsMainRoute(router.pathname === '/');
}, [router.pathname]);
  

  return (
    <div className={`${isFixed ? "position-fixed w-100" : ""}`}>
      <nav className="navbar navbar-expand-lg p-0 background-color">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary top-bar-btn dropdown-toggle"
              id="currencyDropdown"
              data-bs-toggle="dropdown"
            >
              Currency (USD)
            </button>
            <ul className="dropdown-menu" aria-labelledby="currencyDropdown">
              {currencies.map(({ code, symbol }) => (
                <li key={code}>
                  <a className="dropdown-item" href="#">
                    {code} ({symbol})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <Link
              href="/login"
              className="btn btn-link top-bar-btn text-dark text-decoration-none p-0 pe-2 btn-sm hover-primary"
            >
              Login
            </Link>
            <span
              className="border-start border-secondary mx-2"
              style={{ height: "15px" }}
            ></span>
            <Link
              href="/signup"
              className="btn btn-link text-dark top-bar-btn text-decoration-none p-0 ps-2 btn-sm hover-primary"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <div className={`${isMainRoute ? "banner" : ""}`}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link href="/">
              <Image
                className="logo"
                src="/assets/images/white.webp"
                alt="Telus Trip"
                width={100}
                height={50}
              />
            </Link>

            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {menuItems.map((item) => (
                  <li className="nav-item menu-btn-box" key={item}>
                    <Link href="#" className="nav-link menu-btn hover-line">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
