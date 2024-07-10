import React, { useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../../../Components/CustomerInput";
import { airportInfor, travelModeInfo } from "../../../Components/Data/data";
import { Link } from "react-router-dom";
import { store } from "../../../Configs/firebase";
import { addDoc, collection } from "firebase/firestore";
import { AppState } from "../../../Store/context";
import { ToursInforServices } from "../../../Services/service";
import { useQuery } from "react-query";
import { supabase } from "../../../Configs/supabase";

function formatCameroonPhoneNumber(phoneNumber) {
  const digits = phoneNumber.toString().replace(/\D/g, "");
  if (digits.startsWith("237")) {
    return `+237 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(
      9,
      12
    )}`;
  }
  return `+237 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
    6,
    9
  )}`;
}

const DISCOUNTS = {
  COUPLE: 0.15,
  SINGLE: 0.3,
};

function calculateGroupDiscount(groupSize) {
  if (groupSize < 3) {
    throw new Error("Group size must be 3 or more to receive a discount.");
  }
  const baseDiscount = 0.1;
  const additionalDiscountPerPerson = 0.02;
  let totalDiscount =
    baseDiscount + (groupSize - 3) * additionalDiscountPerPerson;
  const maxDiscount = 0.5;
  if (totalDiscount > maxDiscount) {
    totalDiscount = maxDiscount;
  }
  return totalDiscount;
}

function formatMoney(amount, currency) {
  let formatter;

  switch (currency) {
    case "USD":
      formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      break;
    case "XOF":
      formatter = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
      });
      break;
    default:
      throw new Error("Unsupported currency");
  }

  return formatter.format(amount);
}

function convertUSDtoXOF(amountInUSD) {
  const exchangeRate = 605; // Example exchange rate, 1 USD = 605 XOF

  return amountInUSD * exchangeRate;
}

export default function BookingForm() {
  const { user } = AppState();
  const [showModal, setShowModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const userId = user?.user.id;

  console.log("userId", userId)

  const discountCalculatorHandler = (values, selectedTour) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(calculateDiscount(values, selectedTour));
      }, 500);
    });
  };

  const calculateDiscount = (values, selectedTour) => {
    let discount = 0;
    let price = selectedTour.price_2;
    if (values.numberOfParticipants >= 3) {
      price = selectedTour.price_1;
    }

    if (values.travelMode === "Alone") {
      discount = DISCOUNTS.SINGLE;
    } else if (values.travelMode === "Couple") {
      discount = DISCOUNTS.COUPLE;
    } else if (
      values.travelMode === "Family" ||
      values.travelMode === "Group"
    ) {
      discount = calculateGroupDiscount(values.numberOfParticipants);
    }

    return price - price * discount;
  };

  const {
    data = [],
    isLoading,
    error,
  } = useQuery("tours", () => ToursInforServices());

  const handleModalAction = () => {
    setShowModal(false);
    setIsCompleted((prevState) => !prevState);
  };

  const handleEmailEvent = (e) => {
    e.preventDefault();
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=camecotour@gmail.com",
      "_blank"
    );
  };

  const phoneNumber = "+237670112460";

  const tourPriceValue = async (values, data) => {
    const selectedTour = data.find((tour) => tour.tour === values.selectTour);
    if (!selectedTour) {
      alert("Selected tour not found.");
      return 0;
    }

    // Calculate tour price based on the selected tour and values
    let tourPrice = 0;
    try {
      tourPrice = await discountCalculatorHandler(values, selectedTour);
    } catch (error) {
      console.error("Error calculating tour price:", error);
      alert("Error calculating tour price. Please try again.");
      return 0;
    }

    return tourPrice;
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    arrivalDate: "",
    arrivalTime: "",
    message: "",
    selectTour: "",
    airportArrival: "",
    travelMode: "",
    numberOfParticipants: "",
    tourPrice: 0,
  };

  const handleTourSubmitForm = async (values, actions) => {
    if (!user) {
      alert("You must be authenticated to submit the form.");
      return;
    }

    const price = await tourPriceValue(values, data);

    alert(
      `You will be charged up on arrival for the tour a sum of ${formatMoney(
        price,
        "USD"
      )} (${formatMoney(convertUSDtoXOF(price), "XOF")})`
    );

    console.log("price: ", price);
    alert ("arrival date", values.dateOfArrival)

    const timeOfTourPlaced = new Date().toTimeString().split(" ")[0];
    const dayOfTourPlaced = new Date().toDateString();

    const { error } = await supabase.from("booked_tours").insert([
      {
        // id: user?.user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        country: values.country,
        city: values.city,
        selectTour: values.selectTour,
        dateOfArrival: values.arrivalDate,
        timeOfArrival: values.arrivalTime,
        airportOfArrival: values.airportArrival,
        travelMode: values.travelMode,
        numberOfParticipants:
          values.travelMode === "Alone"
            ? 1
            : values.travelMode === "Couple"
            ? 2
            : values.numberOfParticipants,
        message: values.message,
        price: price,
        created_at: `${dayOfTourPlaced} ${timeOfTourPlaced}`,
      },
    ]);

    if (error) {
      console.error(error.message);
      alert(error.message);
      throw error;
    }

    alert("write to booked_tours table success");
  };

  return (
    <div className="mx-20 px-20 mt-10 container">
      <div>
        <h1 className="my-8 text-gray-800 font-medium text-4xl">
          Reservations
        </h1>
        <div>
          <p className="text-xl my-2">
            Email:
            <span className="ml-4">
              <Link to="mailto:camecotour@gmail.com" onClick={handleEmailEvent}>
                camecotour@gmail.com
              </Link>
            </span>
          </p>
          <p className="text-xl my-2">
            Phone:
            <span className="ml-4">
              <a href={`tel:${phoneNumber}`}>
                {formatCameroonPhoneNumber(phoneNumber)}
              </a>
            </span>
          </p>
          <p className="text-xl my-2">Address: Molyko, Buea Cameroon.</p>
          <p className="text-xl my-2">
            website:
            <span className="ml-4 text-red-500">
              <Link
                to="https://eco-tourism-booking-platform.web.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://eco-tourism-booking-platform.web.app
              </Link>
            </span>
          </p>

          <p className="text-2xl text-red-500">
            <strong>NB:</strong> Please ensure you are authenticated before
            filling out any information to avoid loss of data.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Formik initialValues={initialValues} onSubmit={handleTourSubmitForm}>
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="space-y-4">
                <div className="pb-2">
                  <h2 className="text-4xl text-gray-800 font-medium">
                    Booking Form
                  </h2>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    label="First Name"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    label="Last Name"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    value={values.email}
                    id="email"
                    name="email"
                    placeholder="Email"
                    label="Email"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    label="Phone"
                    type="tel"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    label="Country"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    value={values.city}
                    id="city"
                    name="city"
                    placeholder="City"
                    label="City"
                  />
                  <CustomInput
                    as="select"
                    name="selectTour"
                    id="selectTour"
                    label="Select Tour"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.selectTour}
                  >
                    <option className="text-lg" value="">
                      --Select Tour--
                    </option>
                    {isLoading ? (
                      <option className="text-lg" value="">
                        Loading....
                      </option>
                    ) : error ? (
                      <option className="text-lg" value="">
                        {error.message}
                      </option>
                    ) : data.length === 0 ? (
                      <option className="text-lg" value="">
                        No tours available
                      </option>
                    ) : (
                      data?.map((tours) => (
                        <option
                          className="text-lg"
                          key={tours.id}
                          value={tours.tour}
                        >
                          {tours.tour}
                        </option>
                      ))
                    )}
                  </CustomInput>
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.arrivalDate}
                    id="arrivalDate"
                    name="arrivalDate"
                    type="date"
                    placeholder="Date of arrival"
                    label="Date of arrival"
                  />
                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.arrivalTime}
                    type="time"
                    id="arrivalTime"
                    name="arrivalTime"
                    placeholder="Time of arrival"
                    label="Time of arrival"
                  />
                  <CustomInput
                    as="select"
                    name="airportArrival"
                    id="airportArrival"
                    label="Airport of arrival"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.airportArrival}
                  >
                    <option className="text-lg" value="">
                      --Select airport of arrival--
                    </option>
                    {airportInfor.map((airport, index) => (
                      <option className="text-lg" key={index} value={airport}>
                        {airport}
                      </option>
                    ))}
                  </CustomInput>
                  <CustomInput
                    as="select"
                    name="travelMode"
                    id="travelMode"
                    label="Select your travel mode"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.travelMode}
                  >
                    <option className="text-lg" value="">
                      --Select your travel mode--
                    </option>
                    {travelModeInfo.map((travelMode, index) => (
                      <option
                        className="text-lg"
                        key={index}
                        value={travelMode}
                      >
                        {travelMode}
                      </option>
                    ))}
                  </CustomInput>
                  {(values.travelMode === "Family" ||
                    values.travelMode === "Group") && (
                    <CustomInput
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.numberOfParticipants}
                      type="text"
                      id="numberOfParticipants"
                      name="numberOfParticipants"
                      placeholder="Number of participants"
                      label="Number of participants"
                    />
                  )}

                  <CustomInput
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    as="textarea"
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Message"
                    row={4}
                    col={4}
                    label="Message"
                  />
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <button
                    className="uppercase text-xl font-medium rounded-md my-4 p-4 tracking-widest text-white mx-4 bg-gray-800"
                    disabled={isSubmitting ? "text-gray-300" : ""}
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
