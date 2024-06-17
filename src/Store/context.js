import React, { useReducer, useEffect, useContext } from "react";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Configs/firebase";
import { type } from "@testing-library/user-event/dist/type";

export const CONSTANTS = {
  SIGN_UP: "SIGN_UP",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  ERROR: "ERROR",
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

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, defaultAppState);

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: CONSTANTS.SET_USER,
          payload: { user },
        });
      } else {
        dispatch({
          type: CONSTANTS.SIGN_OUT,
        });
      }
    });
    return () => subscribed;
  }, []);

  const signUpHandler = async (email, password, firstName, lastName) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: `${firstName} ${lastName}`,
      });
      dispatch({
        type: CONSTANTS.SIGN_UP,
        payload: { user: userCredentials.user },
      });
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
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: CONSTANTS.SIGN_IN,
        payload: { user: userCredentials.user },
      });
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
      await auth.signOut();
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
    user: state.user,
    error: state.error,
    signInHandler,
    signOutHandler,
    signUpHandler,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default function AppState() {
  useContext(Context);
}
