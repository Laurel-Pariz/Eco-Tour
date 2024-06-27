import { Form, Formik } from "formik";
import CustomInput from "../../../Components/CustomerInput";
import {
  airportInfor,
  tourInfo,
  travelModeInfo,
} from "../../../Components/Data/data";
import { Link } from "react-router-dom";

export default function BookingForm() {
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

  const handleEmailEvent = (e) => {
    e.preventDefault();
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=camecotour@gmail.com",
      "_blank"
    );
  };

  const phoneNumber = "+237670112460";

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
              <a
                href="https://eco-tourism-booking-platform.web.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://eco-tourism-booking-platform.web.app
              </a>
            </span>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Formik
          initialValues={{
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
          }}
          onSubmit={(values) => console.log(values)}
        >
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
                    {tourInfo.map((tour, index) => (
                      <option className="text-lg" key={index} value={tour}>
                        {tour}
                      </option>
                    ))}
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
                    className="uppercase text-xl font-medium rounded-md my-4 p-4 tracking-wildest text-white mx-4 bg-gray-800"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    send
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
