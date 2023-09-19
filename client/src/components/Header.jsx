import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { baseLink } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

/**
 * Header with home - register property - login/logout
 */
function Header() {
  const { setIsAuth, isAuth, setIsLoading, loading } = useContext(AppContext);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${baseLink}/users/logout`, {
        withCredentials: true,
      });
      setIsAuth(false);
      toast.success(data.message);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsAuth(true);
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <nav className="main-navbar">
      <div>
        <h2>PROPERTY APP</h2>
      </div>

      <div className="right-nav">
        <ul>
          {" "}
          <NavLink to="/">Home</NavLink>
        </ul>
        <ul>
          {" "}
          <NavLink to="/add-property">Register Property</NavLink>
        </ul>

        {isAuth ? (
          <>
            <button disabled={loading} onClick={handleLogout} className="btn">
              Logout
            </button>
          </>
        ) : (
          <ul>
            {" "}
            <NavLink to="/login">Login</NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;