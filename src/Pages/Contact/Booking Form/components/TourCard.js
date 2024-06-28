import React from "react";
import { Link } from "react-router-dom";

export default function TourCard({ tourData, deleteHandler }) {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    timeOfTourPlaced,
    dayOfTourPlaced,
    selectTour,
  } = tourData;

  function formatCameroonPhoneNumber(phoneNumber) {
    // Remove all non-digit characters
    const digits = phoneNumber.toString().replace(/\D/g, "");

    // Check if the phone number already starts with 237
    if (digits.startsWith("237")) {
      // Ensure it starts with +237
      return `+237 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(
        9,
        12
      )}`;
    }

    // If it doesn't start with 237, add it
    return `+237 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      9
    )}`;
  }

  return (
    <div
      className="border-2 my-4 mx-4 p-4 rounded-lg border-gray-800"
      style={{ width: "60rem" }}
    >
      <div>
        <div className="flex justify-start">
          <p className="text-lg font-medium">Date and Time of Tour Command : {`${dayOfTourPlaced} ${timeOfTourPlaced}`}</p>
        </div>
        <div className="text-lg font-medium">
          <p>Tour destination: {selectTour}</p>
          <p>Name: {`${firstName} ${lastName}`}</p>
          <p>Email: {email}</p>
          <p>Phone Number: {formatCameroonPhoneNumber(phone)}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={deleteHandler}
          className="mr-4 bg-red-500 rounded-md p-2 my-4 mx-4 text-white text-lg font-medium"
          type="button"
        >
          Delete Tour
        </button>
        <Link
          to={`/tours/booked-tours/${id}`}
          className=" bg-gray-800 rounded-md p-2 my-4 mx-4 text-white text-lg font-medium"
          target="_blank"
        >
          View Tour
        </Link>
      </div>
    </div>
  );
}
