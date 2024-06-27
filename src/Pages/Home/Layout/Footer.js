import React from "react";
import { navigation } from "./Navbar";
import { Link } from "react-router-dom";

export default function Footer() {
  const currYear = new Date().getFullYear();

  const quickLinks = navigation.filter(
    (name) => name.name !== "Home" && name.name !== "Auth Page"
  );

  return (
    <div className="bg-gray-800">
      <div className="mx-20 pt-8 px-20 mt-10">
        <div>
          <h2 className="text-2xl mb-4 text-white underline">Quick Links</h2>
          <ul>
            {quickLinks.map((link, index) => (
              <li key={index} className="py-1">
                <Link to={link.href} className="text-lg text-gray-300">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div className="flex justify-center text-center pb-4">
          <p className="text-lg text-white">
            Established since &copy; {currYear}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
