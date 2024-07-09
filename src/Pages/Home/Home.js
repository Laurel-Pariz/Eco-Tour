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

export default function Home() {
  const { user } = AppState();
  const location = useLocation();
  console.log("userInformation: ", user);
  console.log("userId: ", user?.user.id);
  console.log("user-role: ", user?.user.role);

  const {
    data: userProfiles = [],
    isLoading,
    error,
  } = useQuery("userProfiles", () => fetchUserProfiles());
  console.log("userProfiles: ", userProfiles);

  const renderUserProfiles = () => {
    if (isLoading) {
      return <p>Loading</p>;
    } else if (error) {
      return <p>{error.message}</p>;
    } else if (userProfiles.length === 0 || null) {
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
              {userProfiles?.map((userInfo) => {
                const {
                  id,
                  name,
                  user: {
                    created_at,
                    user_metadata: { email, phone, firstName, lastName },
                  },
                } = userInfo;

                console.log(
                  "user in data: ",
                  created_at,
                  email,
                  firstName,
                  lastName,
                  phone
                );
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
