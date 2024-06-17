import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/our-tours">Our Tours</NavLink>
      <NavLink to="/cameroon-regions">Cameroon Regions</NavLink>
      <NavLink to="/culture-language-religion">
        Culture, Language, Religion
      </NavLink>
      <NavLink to="/visa-health-safety">Visa, Health, Safety</NavLink>
      <NavLink to="/general-information">General Information</NavLink>
      <NavLink to="/about-us">About Us</NavLink>
      <NavLink to="/booking-form">Booking Form</NavLink>
    </div>
  );
}
