import React from "react";
import { aboutInfo } from "../../../Components/Data/data";

export default function AboutUs() {
  return (
    <div className="mt-10 mx-20 px-20">
      <h1 className="text-4xl font-medium text-center my-8">
        About <span className="text-red-500">Cameroon</span>
      </h1>

      {aboutInfo.map((info, index) => (
        <div key={index}>
          <h2 className="text-2xl text-gray-800 font-medium my-4">
            {info.title}
          </h2>
          <p className="text-xl">{info.content}</p>
        </div>
      ))}
    </div>
  );
}
