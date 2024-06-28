import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthState = () => {
    setTimeout(() => {
      setAuthState((prevAuthState) => !prevAuthState);
    }, 500);
  };

  const handleUserSignUp = async (values, actions) => {
    try {
      signUpHandler(
        values.email,
        values.password,
        values.firstName,
        values.lastName
      );
      alert("Success!!");
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
    <div
      style={{
        backgroundImage:
          "url('https://yandex-images.clstorage.net/alE4k7282/0731abW5/IjCeaJJAUbGfcl1BJzGhUeys2g0t_z7ICiPWYwZeLfe4sGaagflMyYW3H1tJSrL7Qb91vn3-JR5gNHHik0RUyOd07hzmhGWgOrcZENOVYSF87S68-X86uc8DZxKzS9mCXWXz2jI_m57ntPi4S42ALNVKACsY7_SOdZHiNBcTkY1iM86KsyGgl58AP_cEc0HSLA-vrV1vKFhfMyWmQygqJb7SNh1BPIsM1pQpOXuM4T70C5PZms4zDrXwMtXSsWIcQwEMytICQgdO43wUxOEQg3zdjrzNXSqpr8BEpeEoeeS_EIfuopwav8Y0qPgp7lLOx_kiChifAy_VUCJVkiGAbSMQX2uDwBMnLsC_FlZR4iLef6-NLU17SZ0iRXYReKm3DSKmjmLPaa4V96j4O-xgfBb7s-vbLoEfdXChpqCwUf-RQt_YQhGB10zBPBTUMNDDTM0evM0v-Fv_8NUmwRqplm6ApP6RrclOtvd6KOn_Ee-mGxBa-i_yjrWzokVAM3Ls8IDvKSDBEqX94G5UhLNBIi7djL0cLCqK37G1prE6q4VtEEW90t7InjQGmtp4vrIeJHiD2WsuwMy3giMW0_FQzsER7TuSkHIWbOA8x5Yw8KPOjQ_sbr7pOq2Rp0Zj6VoHX6CVj-Le2y4lxEr7W_xjryb7cPvY7uNuJxMhhtBTY16QsI8LM2HiRd7AridU09Dyvm4cr97NSovec9UG4wsbJW8BRYwS7Qs81Uao-Hm8wu4ViKIbKAzCPGZhk7ez8YHfcDC_SxJA8ac84m8W1JNzYUyMXA2fXztZrqJm5IP6KkTtAbWfcu05v8Y0mcpYXrG-Bpjyewos0y1H87G2YhCxLTLBPetTAfH37REOh6XzoUAu3B4Pvf5pO83CFBRxi9o1rIDWLZD_Ccx3F-kpWc2T3SYJc9hIroDMJbPiVkKxMx5BUqz4otIR509hXSeX4pAjTi8u32zuWtpeQ7eH0TnI8')",
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
