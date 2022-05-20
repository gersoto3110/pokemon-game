import { createContext, useEffect, useReducer } from "react";
import { authReducer, types, initAuth } from "./authReducer";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "../config/firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initAuth);

  useEffect(() => {
    if (!auth) return;

    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log({ currentUser });
      if (!currentUser) dispatch({ type: types.logout });
      else dispatch({ type: types.isLogged });
    });
    return () => unsubuscribe();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: types.isLogged });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.updateError, payload: error });
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      dispatch({ type: types.isLogged });
    } catch (error) {
      console.error(error);
      dispatch({ type: types.updateError, payload: error });
    }
  };

  const handleSignUp = async (name, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      dispatch({ type: types.updateError, payload: error });
    }
  };

  const handleSingOut = async () => {
    try {
      await signOut(auth);

      dispatch({ type: types.logout });
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    ...authState,
    handleSignIn,
    handleSignInWithGoogle,
    handleSignUp,
    handleSingOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
