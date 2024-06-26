import React from "react";
import { regionsInfo } from "../../../Components/Data/data";

export default function CameroonRegions() {
  return (
    <div className="mt-10 mx-20 px-20">
      <h1>Cameroon's Regions</h1>

      <div>
        {regionsInfo.map((region, index) => (
          <div key={index}>
            <h2>
              {" "}
              {index + 1} {region.region}
            </h2>
            <p>
              <strong>Capital:</strong> {region.capital}
            </p>
            <p>
              <strong>Geography:</strong> {region.geography}
            </p>
            <p>
              <strong>Culture:</strong> {region.culture}
            </p>
            <p>
              <strong>Economy:</strong> {region.economy}
            </p>
            <p>
              <strong>Tourism:</strong> {region.tourism}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
