import { Form, Formik } from "formik";
import CustomInput from "../../../Components/CustomerInput";

export default function BookingForm() {
  return (
    <div className="mx-auto px-4 container">
      <h1>Booking Form Page</h1>
      <div>
        <h1>Reservations</h1>
        <div>
          <p>Email: </p>
          <p>Phone: </p>
          <p>Address: </p>
          <p>website: https: </p>
        </div>
      </div>

      <div>
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
          }}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="space-y-12">
                <div className="pb-2">
                  <h2>Booking Form</h2>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    type="text"
                    id="message"
                    name="message"
                    placeholder="Message"
                    label="Message"
                  />
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <button className="uppercase" type="submit">
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
