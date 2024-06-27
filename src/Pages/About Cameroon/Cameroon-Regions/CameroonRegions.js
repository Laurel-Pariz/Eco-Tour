import React from "react";
import { regionsInfo } from "../../../Components/Data/data";

export default function CameroonRegions() {
  return (
    <div className="mt-10 mx-20 px-20">
      <h1 className="text-gray-800 text-center text-4xl font-bold">
        Cameroon's <span className="text-red-500">Regions</span>
      </h1>

      <div>
        {regionsInfo.map((region, index) => (
          <div key={index} className="my-8 text-lg">
            <h2 className="text-2xl font-medium text-gray-800">
              {index + 1} {region.region} ({region.capital})
            </h2>
            <img
              src={region.image}
              alt={region.capital}
              className="my-4"
              style={{ width: "70rem", height: "25rem" }}
            />
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
