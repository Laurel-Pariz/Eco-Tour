import React from "react";
import { Link } from "react-router-dom";

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

function adjustDateFormat(dateString) {
  // Create a new date object from the date string
  const date = new Date(dateString);

  // Extract the components of the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  // Format the date into the desired format
  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;

  return formattedDate;
}

export default function TourCard({ tourData, deleteHandler }) {
  const { tour_id, firstName, lastName, email, phone, created_at, selectTour } =
    tourData;

  return (
    <div
      className="border-2 my-4 mx-4 p-4 rounded-lg border-gray-800"
      style={{ width: "60rem" }}
    >
      <div>
        <div className="flex justify-start">
          <p className="text-lg font-medium">
            Date and Time of Tour Command : {adjustDateFormat(created_at)}
          </p>
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
          to={`/tours/booked-tours/${tour_id}`}
          className=" bg-gray-800 rounded-md p-2 my-4 mx-4 text-white text-lg font-medium"
          target="_blank"
        >
          View Tour
        </Link>
      </div>
    </div>
  );
}
