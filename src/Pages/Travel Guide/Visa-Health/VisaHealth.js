import React from "react";
import { travelInfo } from "../../../Components/Data/data";

export default function VisaHealth() {
  return (
    <div className="mt-10 mx-20 px-20">
      {travelInfo.map((info, index) => (
        <div key={index}>
          <h2 className="text-gray-800 text-4xl my-4 font-medium">
            {info.title}
          </h2>
          {info.content.map((item, itemIndex) => (
            <div key={itemIndex}>
              <h3 className="my-2 text-gray-800 text-2xl font-medium">
                - {item.subtitle}
              </h3>
              <p className="text-lg">{item.details}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
