import React, { useReducer, useEffect, useContext } from "react";
import { supabase, supabaseAuth } from "../Configs/supabase"; // Adjust the import path as needed

export const CONSTANTS = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  ERROR: "ERROR",
  SET_USER: "SET_USER",
};

export const Context = React.createContext();

export const defaultAppState = {
  user: null,
  error: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case CONSTANTS.SIGN_UP:
    case CONSTANTS.SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };

    case CONSTANTS.SIGN_OUT:
      return {
        ...state,
        user: null,
        error: null,
      };

    case CONSTANTS.ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case CONSTANTS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, defaultAppState);
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Event: ", event);
      console.log("Session: ", session);
      if (
        event === CONSTANTS.SIGN_IN ||
        event === CONSTANTS.SIGN_UP ||
        session
      ) {
        setSession(session);
        dispatch({
          type: CONSTANTS.SET_USER,
          payload: { user: session },
        });
      } else if (event === CONSTANTS.SIGN_OUT) {
        setSession(null);
        dispatch({
          type: CONSTANTS.SIGN_OUT,
        });
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signUpHandler = async (
    email,
    password,
    firstName,
    lastName,
    role,
    phone,
    redirectLink
  ) => {
    try {
      const { data, error } = await supabaseAuth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            role,
            email_verified: false,
            phone,
            user: {
              phone,
            },
            user_metadata: {
              role,
              email_verified: false,
              phone_verified: false,
              phone,
            },
            redirectTo: redirectLink,
          },
        },
      });

      if (error) {
        throw error;
      }

      dispatch({
        type: CONSTANTS.SIGN_UP,
        payload: { user: data.user },
      });
      return { user: data.user };
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signInHandler = async (email, password) => {
    try {
      const { data, error } = await supabaseAuth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      dispatch({
        type: CONSTANTS.SIGN_IN,
        payload: { user: data.user },
      });
      return { user: data.user };
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signOutHandler = async () => {
    try {
      const { error } = await supabaseAuth.signOut();
      if (error) {
        throw error;
      }
      dispatch({
        type: CONSTANTS.SIGN_OUT,
      });
    } catch (error) {
      dispatch({
        type: CONSTANTS.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const value = {
    user: session,
    error: state.error,
    signInHandler,
    signOutHandler,
    signUpHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const AppState = () => useContext(Context);
