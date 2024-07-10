import CardComponent from "../../Components/Card";
import { AppState } from "../../Store/context";
import { discoverCameroon } from "../../Components/Data/data";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { UserIcon } from "@heroicons/react/24/outline";
import { MdOutlineTour } from "react-icons/md";
import { FaRegBookmark, FaArrowRight } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchUserProfiles } from "../../Services/adminServices";
import { ToursInforServices } from "../../Services/service";
import { useState } from "react";
import { supabase } from "../../Configs/supabase";
import { Modal } from "flowbite-react";
import { Formik, Form } from "formik";
import CustomInput from "../../Components/CustomerInput";

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
  const exchangeRate = 605;
  return amountInUSD * exchangeRate;
}

export default function Home() {
  const { user } = AppState();
  const location = useLocation();

  const [isAdding, setIsAdding] = useState(false);

  const handleAddTour = () => setIsAdding(true);
  const handleCloseModal = () => setIsAdding(false);

  const addTourHandler = async (values, actions) => {
    try {
      const { error } = await supabase
        .from("tours")
        .insert([
          {
            tour: values.tour,
            price_1: values.price_1,
            price_2: values.price_2,
          },
        ])
        .select("*");

      if (error) throw error;

      alert("new tour add success");

      actions.resetForm();
      setIsAdding(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    data: userProfiles = [],
    isLoading,
    error,
  } = useQuery("userProfiles", fetchUserProfiles);
  console.log("userProfiles: ", userProfiles);

  const {
    data: toursData = [],
    isLoading: toursLoading,
    error: toursError,
  } = useQuery("tours", ToursInforServices);

  const renderToursInformation = () => {
    if (toursLoading) {
      return <p>Loading tours...</p>;
    } else if (toursError) {
      return <p>{toursError.message}</p>;
    } else if (toursData.length === 0) {
      return <p>No tours available, please add tours</p>;
    } else {
      return (
        <div className="flex bg-gray-100 p-4 m-4">
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Tours</th>
                <th className="px-4 py-2">Price per 2 persons</th>
                <th className="px-4 py-2">Price per 3 persons</th>
              </tr>
            </thead>
            <tbody>
              {toursData.map((toursInfor) => (
                <tr key={toursInfor.id}>
                  <td className="border px-4 py-2">{toursInfor.tour}</td>
                  <td className="border px-4 py-2">
                    {formatMoney(toursInfor.price_2, "USD")} /{" "}
                    {formatMoney(convertUSDtoXOF(toursInfor.price_2), "XOF")}
                  </td>
                  <td className="border px-4 py-2">
                    {formatMoney(toursInfor.price_1, "USD")} /{" "}
                    {formatMoney(convertUSDtoXOF(toursInfor.price_1), "XOF")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            className="flex justify-center"
            show={isAdding}
            onClose={handleCloseModal}
          >
            <Modal.Header>
              <div className="flex justify-center text-center text-gray-800">
                Add new tour
              </div>
            </Modal.Header>
            <Modal.Body className="grid justify-center">
              <Formik
                initialValues={{ tour: "", price_1: "", price_2: "" }}
                onSubmit={addTourHandler}
              >
                {({ values, isSubmitting, handleChange, handleBlur }) => (
                  <Form>
                    <CustomInput
                      name="tour"
                      id="tour"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tour}
                      placeholder="Add touristic destination"
                      label="Touristic destination"
                    />
                    <CustomInput
                      name="price_1"
                      id="price_1"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price_1}
                      placeholder="Price per 3 persons (in USD)"
                      label="Price per 3 persons (in USD)"
                    />
                    <CustomInput
                      name="price_2"
                      id="price_2"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price_2}
                      placeholder="Price per 2 persons (in USD)"
                      label="Price per 2 persons (in USD)"
                    />

                    <button
                      type="submit"
                      className="
                      flex justify-center text-center
                       bg-gray-800 text-white rounded-md
                       font-medium px-2 py-2 mx-4 my-4"
                    >
                      Add tour
                    </button>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  };

  const renderUserProfiles = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    } else if (error) {
      return <p>{error.message}</p>;
    } else if (userProfiles.length === 0) {
      return <p>No users in system</p>;
    } else {
      return (
        <div className="flex bg-gray-100 p-4 m-4">
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {userProfiles.map((userInfo) => {
                const {
                  id,
                  name,
                  user: {
                    user_metadata: { email, phone },
                  },
                } = userInfo;

                return (
                  <tr key={id}>
                    <td className="border px-4 py-2">{name}</td>
                    <td className="border px-4 py-2">{email}</td>
                    <td className="border px-4 py-2">
                      {formatCameroonPhoneNumber(phone)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const role = location.pathname.includes("admin/dashboard/home")
    ? "admin"
    : "user";

  const homeContent = () => {
    if (role === "admin") {
      return (
        <div className="flex">
          <div className="bg-gray-800 min-h-screen">
            <Sidebar aria-label="Default sidebar example">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link
                    to="#"
                    className="flex items-center text-medium text-xl p-4"
                  >
                    <UserIcon className="h-8 w-8 mr-4" /> Users{" "}
                    <FaArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center text-medium text-xl p-4"
                  >
                    <MdOutlineTour className="h-8 w-8 mr-4" /> Tours{" "}
                    <FaArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center text-medium text-xl p-4"
                  >
                    <FaRegBookmark className="h-8 w-8 mr-4" /> Booked Tours{" "}
                    <FaArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
          <div className="flex-1 p-4">
            <p className="text-gray-800">Admin dashboard</p>
            <h1>User Profiles</h1>
            {renderUserProfiles()}
            <h1>Tours</h1>
            {renderToursInformation()}
            {!isAdding && (
              <button
                onClick={handleAddTour}
                className="bg-gray-800 text-white p-2 mt-2 font-medium rounded-md"
              >
                Add Tour
              </button>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mb-8">
            <h1 className="text-gray-900 text-2xl uppercase font-medium">
              Touristic Sites
              <span className="text-red-500"> in Cameroon</span>
            </h1>

            <p className="text-gray-900 text-lg">
              Cameroon is a choice destination with a lot of attractions for any
              visitor. The country has a lot of natural attractions and many
              other phenomena that are not found anywhere else in the world,
              making it possible to have various categories of tourism.
            </p>

            <hr className="my-4" />

            <h1 className="text-gray-900 uppercase text-2xl font-medium">
              Heritage Sites
            </h1>

            <p className="text-gray-900 text-lg">
              Cameroon is one of the older countries of Africa and therefore has
              a lot of cites that can claim to be labelled as World Heritage
              Sites. There are several rich, historical, cultural and unusual
              attractions in Cameroon that form part of Cameroon's heritage. The
              diversity of languages, about 250 spoken by about 18 million
              people is in itself one of Cameroon's great cultural heritages.
              The list below are just some of the sites we want to you discover.
              We also advice you to get your cameras ready for in Cameroon there
              is so much to see and discover.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {discoverCameroon.map((discover) => (
              <CardComponent
                key={discover.title}
                img={discover.image}
                title={discover.title}
                text={discover.text}
              />
            ))}
          </div>

          <Link to="/our-tours">Book Tour(s)</Link>
        </div>
      );
    }
  };

  return (
    <>
      {homeContent()}

      <p>User Email : {user?.email}</p>
      <p>User Name : {user?.displayName}</p>
    </>
  );
}

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
