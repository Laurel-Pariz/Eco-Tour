import React from "react";

export default function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <div className="bg-gray-900">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className="flex justify-center text-center pb-4">
      <p className="text-lg text-white">
        Established since &copy; {currYear}. All rights reserved.
      </p>
      </div>
    </div>
  );
}
