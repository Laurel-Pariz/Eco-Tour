import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AppState } from "../../Store/context";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../Components/CustomerInput";
import { supabase } from "../../Configs/supabase";

const SignUpErrorMessage = ({ error }) => {
  return (
    <>
      {alert(error.message)}
      <p>{error.message}</p>
      <p>Please try again</p>
    </>
  );
};

const SignInErrorMessage = ({ error }) => {
  return (
    <>
      {alert(error.message)}
      <p>Error signing into account</p>
      <p>Please try again</p>
    </>
  );
};

// Helper function to create user profile
const createUserProfile = async (user, profile) => {
  const { error } = await supabase
    .from("userProfiles")
    .insert([{ id: user?.user.id, ...profile }], { returning: "minimal" });
  if (error) throw error;

  // return data;
};

// Helper function to create admin profile
const createAdminProfile = async (user, profile) => {
  const { data, error } = await supabase
    .from("adminProfiles")
    .insert([{ id: user?.user.id, ...profile }], { returning: "minimal" });
  if (error) throw error;
  return data;
};

export default function AuthPage() {
  const { signInHandler, signUpHandler, user } = AppState();
  const [authState, setAuthState] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log("auth page userId: ", user?.user.id);
  const userId = user?.user.id;

  const handleAuthState = () => {
    setTimeout(() => {
      setAuthState((prevAuthState) => !prevAuthState);
    }, 500);
  };

  const handleUserSignUp = async (values, actions) => {
    const role = location.pathname === "/admin/sign-in" ? "admin" : "user";
    const redirectTo = role === "admin" ? "/admin/dashboard/home" : "/";
    try {
      await signUpHandler(
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        role,
        values.phone
      );

      alert("Success!!");

      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        },
      });
      navigate(redirectTo);
      try {
        // Create profile in appropriate table
        const profile = {
          userId: userId,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          role: role,
        };

        if (role === "admin") {
          const { error } = await supabase.from("adminProfiles").insert({
            id: userId,
            name: `${values.firstName} ${values.lastName}`,
            user: user,
          });
          if (error) throw error;
          alert("success to admin database");
        } else {
          const { error } = await supabase.from("userProfiles").insert([
            {
              id: userId,
              name: `${values.firstName} ${values.lastName}`,
              user: user,
            },
          ]);
          if (error) {
            alert(error.message);
            console.error(error.message);
            throw error;
          }
          alert("success to user database");
        }
      } catch (error) {
        alert(error.message);
        console.error(error.message);
      }
    } catch (error) {
      alert(error);
      throw new Error(<SignUpErrorMessage error={error} />);
    }
  };

  const handleLogInUser = async (values, actions) => {
    const role = location.pathname === "/admin/sign-in" ? "admin" : "user";
    const redirectTo = role === "admin" ? "/admin/dashboard/home" : "/";
    try {
      await signInHandler(values.email, values.password);
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
      navigate(redirectTo);
    } catch (error) {
      alert(error);
      throw new Error(<SignInErrorMessage error={error} />);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://avatars.mds.yandex.net/i?id=5ad4eaed62843fd59156e8ca6afb91594a3ff6b8-9222271-images-thumbs&n=13')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-3rem",
        marginBottom: "-2.5rem",
      }}
    >
      <div className="mt-10 mb-10 flex items-center justify-center min-h-screen">
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
          }}
          onSubmit={authState ? handleUserSignUp : handleLogInUser}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form className="w-full max-w-md p-4  rounded-lg shadow-xl">
              <div className="space-y-4">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className=" font-semibold text-center leading-7 text-2xl text-white bg-gray-800 w-60 rounded-md p-4 justify-center">
                    {authState ? "Create Account" : "Log In"}
                  </h2>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <CustomInput
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="email"
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email address"
                      label="Email"
                    />
                    {authState && (
                      <CustomInput
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.firstName}
                        placeholder="Enter First Name"
                        label="First Name"
                      />
                    )}
                    {authState && (
                      <CustomInput
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="text"
                        onBlur={handleBlur}
                        value={values.lastName}
                        placeholder="Enter Last Name"
                        label="Last Name"
                      />
                    )}
                    {authState && (
                      <CustomInput
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        type="tel"
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="Enter phone number"
                        label="Phone Number"
                      />
                    )}
                    <CustomInput
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter Password"
                      label="Password"
                      togglePassword={() => setShowPassword(!showPassword)}
                      showPassword={showPassword}
                    />
                  </div>

                  <div className="mt-10 flex bg-gray-800 w-80 rounded-md p-4 justify-center">
                    <p className="block text-lg font-medium leading-6 text-white">
                      {authState ? "Already have an account ?" : "New user ?"}
                    </p>
                    <button
                      className="block ml-2 text-lg font-medium leading-6 text-white"
                      type="button"
                      onClick={handleAuthState}
                    >
                      {authState ? "Log in" : "Create account"}
                    </button>
                  </div>

                  <div className="mt-10">
                    <button
                      className="block text-lg font-medium leading-6 rounded-md p-4 mx-4 my-4 bg-gray-800 text-white"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {authState ? "Create Account" : "Log in"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
