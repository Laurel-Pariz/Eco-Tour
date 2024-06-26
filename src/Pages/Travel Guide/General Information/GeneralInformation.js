import React from "react";
import { generalInfo } from "../../../Components/Data/data";

export default function GeneralInformation () {
    return <div className="mt-10 mx-20 px-20">
    <h1>General Information about Cameroon</h1>
    {generalInfo.map((info, index) => (
      <div key={index}>
        <h2>{info.title}</h2>
        <p>{info.content}</p>
        {index !== generalInfo.length - 1 && <hr />} {/* Add hr except for the last item */}
      </div>
    ))}
  </div>
}