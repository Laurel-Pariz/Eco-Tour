import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { AppState } from "../../Store/context";
import { redirect } from "react-router-dom";
import CustomInput from "../../Components/CustomerInput";

const SignUpErrorMessage = () => {
  return (
    <>
      <p>Something went wrong</p>
      <p>Please try again</p>
    </>
  );
};

const SignInErrorMessage = () => {
  return (
    <>
      <p>Error signing into account</p>
      <p>Please try again</p>
    </>
  );
};

export default function AuthPage() {
  const { signInHandler, signUpHandler } = AppState();
  const [authState, setAuthState] = useState(true);

  const handleAuthState = () => {
    setTimeout(() => {
      setAuthState((prevAuthState) => !prevAuthState);
    }, 500);
  };

  const handleUserSignUp = async (values, actions) => {
    try {
      await signUpHandler(
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );
      redirect("/home");
      actions.resetForm({
        values: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        },
      });
    } catch (error) {
      throw new Error(<SignUpErrorMessage />);
    }
  };

  const handleLogInUser = async (values, actions) => {
    try {
      await signInHandler(values.email, values.password);
      redirect("/home");
      actions.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    } catch (error) {
      throw new Error(<SignInErrorMessage />);
    }
  };

  return (
    <div className="mx-auto px-4 container">
      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={authState ? handleUserSignUp : handleLogInUser}
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  {authState ? "Create Account" : "Login In"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600"></p>

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
                  <CustomInput
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter Password"
                    label="Password"
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <p className="block text-sm font-medium leading-6 text-gray-900">
                    {authState ? "Already have an account ?" : "New user ?"}
                  </p>
                  <button
                    className="block text-sm font-medium leading-6 text-gray-900"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleAuthState}
                  >
                    {authState ? "Log in" : "Create account"}
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <button
                    className="block text-sm font-medium leading-6 text-gray-900"
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
  );
}
