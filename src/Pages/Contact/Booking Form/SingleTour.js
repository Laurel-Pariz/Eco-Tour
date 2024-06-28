import React from "react";
import { useParams } from "react-router-dom";
import { AppState } from "../../../Store/context";
import { useQuery } from "react-query";
import { BookedTourService } from "../../../Services/service";
import CustomInput from "../../../Components/CustomerInput";
import { Form, Formik } from "formik";

export default function SingleTour() {
  const { user } = AppState();
  const userId = user?.uid;
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(
    ["tour", userId, id],
    () => BookedTourService(userId, id),
    {
      enabled: !!userId,
    }
  );
  console.log("single tour: ", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No tour data found</div>;
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    arrivalDate,
    message,
    selectTour,
    travelMode,
    numberOfParticipants,
    airportArrival,
    arrivalTime,
  } = data;

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

  const phoneNumber = formatCameroonPhoneNumber(phone);

  return (
    <div className="mx-20 px-20 my-4 py-4">
      <div>
        <Formik>
          {() => (
            <Form>
              <div className="my-8">
                <h1 className="mb-4 text-2xl text-gray-800 font-medium">
                  Contact Information
                </h1>
                <CustomInput label="Names" value={`${firstName} ${lastName}`} />
                <CustomInput label="Email" value={email} />
                <CustomInput label="Phone" value={phoneNumber} />
              </div>
              <div className="my-8">
                <h1 className="mb-4 text-2xl text-gray-800 font-medium">
                  Location
                </h1>
                <CustomInput label="City" value={city} />
                <CustomInput label="Country" value={country} />
              </div>
              <div className="my-8">
                <h1 className="mb-4 text-2xl text-gray-800 font-medium">
                  Tour Information{" "}
                </h1>
                <CustomInput label="Tour" value={selectTour} />
                <CustomInput label="Date of arrival" value={arrivalDate} />
                <CustomInput label="Time of arrival" value={arrivalTime} />
                <CustomInput label="Country" value={country} />
                <CustomInput
                  label="Airport of arrival"
                  value={airportArrival}
                />
                <CustomInput label="Travel mode" value={travelMode} />
                <CustomInput
                  label="Number of participants"
                  value={numberOfParticipants}
                />
                <CustomInput as="textarea" label="Message" value={message} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
