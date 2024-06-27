import React from "react";

export default function Footer() {

  const currYear = new Date().getFullYear()

  return (
    <div>
      <h1>Footer section</h1>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>Established since &copy;{currYear}. All copy rights reserved.</div>
    </div>
  );
}
