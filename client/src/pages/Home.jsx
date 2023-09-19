import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseLink } from "../main";
import { toast } from "react-hot-toast";
import PropertyList from "../components/Table/PropertyList";
import { AppContext } from "../components/AppContextProvider";
import { Navigate } from "react-router-dom";

/**
 * Main page. Loads all saved properties.
 */

function Home() {
  const [allProperties, setAllProperties] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuth } = useContext(AppContext);

  // TODO delete only my properties
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${baseLink}/property/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  const getAllProperties = async () => {
    try {
      let { data } = await axios.get(`${baseLink}/property/getAllProperties`, {
        withCredentials: true,
      });
      setAllProperties(data.allProperties);
    } catch (error) {
      console.log("error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProperties();
  }, [refresh]);

  if (!isAuth) return <Navigate to="/login" />;

  return (
    <PropertyList
      properties={allProperties}
      deleteHandler={deleteHandler}
    />
  );
}

export default Home;
