import React from "react";
import { travelInfo } from "../../../Components/Data/data";

export default function VisaHealth() {
  return (
    <div className="mt-10 mx-20 px-20">
      {travelInfo.map((info, index) => (
        <div key={index}>
          <h2>{info.title}</h2>
          {info.content.map((item, itemIndex) => (
            <div key={itemIndex}>
              <h3>{item.subtitle}</h3>
              <p>{item.details}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
