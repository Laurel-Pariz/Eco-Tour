import React from "react";
import { generalInfo } from "../../../Components/Data/data";

export default function GeneralInformation() {
  return (
    <div className="mt-10 mx-20 px-20">
      <h1 className="text-gray-800 text-5xl font-medium text-center my-8">
        General Information <span className="text-red-500">about Cameroon</span>
      </h1>
      {generalInfo.map((info, index) => (
        <div key={index}>
          <h2 className="text-gray-800 text-2xl font-medium my-4">
            {index + 1} {info.title}
          </h2>
          <p className="text-xl">{info.content}</p>
        </div>
      ))}
    </div>
  );
}
