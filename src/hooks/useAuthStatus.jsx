import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setIsLoading(false);
    });
  }, []);

  return { loggedIn, loading };
}
export default useAuthStatus;
