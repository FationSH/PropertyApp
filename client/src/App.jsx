import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./components/AppRoutes";
import Header from "./components/Header";
import axios from "axios";
import { AppContext } from "./components/AppContextProvider";
import { baseLink } from "./main";

/**
 * App => Check if user logged in already using context
 * Server uses cookies to remember user.
 */

function App() {
  const {  setUser, setIsAuth, setIsLoading } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    axios.
      get(`${baseLink}/users/user`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res:", res);
        setUser(res.data.user);
        setIsAuth(true);
      })
      .catch((error) => {
        console.log("error:", error);
        setUser({});
        toast.error("Login first");
        setIsAuth(false);
      });
      setIsLoading(false);
  }, []);

  return (
    <>
      <Header />
      <AppRoutes />
      <Toaster />
    </>
  );
}

export default App;