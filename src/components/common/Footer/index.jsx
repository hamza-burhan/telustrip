import Image from "next/image";

const FooterSection = ({ title, links }) => (
  <div className="footer-col col-12 col-lg-3 mb-3">
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <a href="#" className="nav-link p-0 heading">
          {title}
        </a>
      </li>
      {links.map((link, index) => (
        <li key={index} className="nav-item mb-2">
          <a href="#" className="nav-link p-0">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="py-5 container-fluid">
      <div className="row">
        <div className="col-lg-3 footer-col mb-3 d-flex flex-column justify-content-center align-items-center">
          <Image
            className="logo mb-2"
            src="/assets/images/white.webp"
            alt="Telus Trip"
            width={100}
            height={50}
          />
          <ul className="nav flex-column text-center">
            {["© 2025 Telus Trip", "All rights reserved."].map(
              (text, index) => (
                <li key={index} className="nav-item mb-2">
                  <a href="#" className="nav-link p-0">
                    {text}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <FooterSection
          title="Company"
          links={["Home", "About", "Products", "Contact"]}
        />
        <FooterSection
          title="Resources"
          links={["Flights", "Destinations", "Deals", "Blog"]}
        />
        <FooterSection
          title="Support"
          links={["FAQs", "Contact Us", "Privacy", "Terms"]}
        />
      </div>
    </footer>
  );
}
