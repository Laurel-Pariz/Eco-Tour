import React from "react";
import { aboutInfo } from "../../../Components/Data/data";

export default function AboutUs() {
  return (
    <div className="mt-10 mx-20 px-20">
      <h1>About Cameroon</h1>

      {aboutInfo.map((info, index) => (
        <div key={index}>
          <h2>{info.title}</h2>
          <p>{info.content}</p>
          {index !== aboutInfo.length - 1 && <hr />}{" "}
          {/* Add hr except for the last item */}
        </div>
      ))}
    </div>
  );
}
