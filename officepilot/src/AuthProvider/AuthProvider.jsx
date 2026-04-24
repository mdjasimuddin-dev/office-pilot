import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { useEffect, useState } from "react"; // Fixed: createContext import
import AuthContext from "./../Context/AuthContext";


import useAxiosSecure from "../Hooks/AxiosSecure";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const axiosSecure = useAxiosSecure()

  // Create user
  const userCreate = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update profile
  const userProfileUpdate = async (name, photo) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      // State sync
      setUser({ ...auth.currentUser, displayName: name, photoURL: photo });
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User: ", currentUser);
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        const loggedUser = { email: currentUser.email };

        axiosSecure
          .post(`/createToken`, loggedUser)
          .then((res) => {
            const token = res?.data?.token;
            localStorage.setItem("token", token);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    userCreate,
    userProfileUpdate,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
