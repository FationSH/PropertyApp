import { useState, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { baseLink } from "../main";

import { Input } from "@chakra-ui/react";

/**
 * Drop down for area field. Use server (proxy) to fetch the data.
 * @returns selected mainText and placeId
 */

const SearchableDropdown = ({
  label,        // field to select from object
  id,           // id used for div key
  selectedVal,
  placeholder,
  handleChange
}) => {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // Map for caching
  const cachingHashMap = useRef(new Map());
  
  const getSuggetions = async (str) => {
    try {
      const { data } = await axios.get(`${baseLink}/property/sugg/${str}`, {
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "Accept-Language": "el-GR,el;q=0.9,en;q=0.8,fr;q=0.7,sq;q=0.6,fi;q=0.5,de;q=0.4"
        },
      });
      setOptions(() => data);
      cachingHashMap.current =  cachingHashMap.current.set((str).toLowerCase(), data);
    } catch (error) {
      console.log("error:", error);
      toast.error("Couldn't load Suggestions");
    }
  };

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option);
    setIsOpen((isOpen) => !isOpen);
  };

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;
    return "";
  };

  const inputChange = (e) => {
    setQuery(e.target.value);
    handleChange(null);
    if (e.target.value.length <=2) {
      setIsOpen(() => false)
    } else {
      setIsOpen(() => true)
      // Check if value in cache
      if (cachingHashMap.current.has((e.target.value).toLowerCase())){
        setOptions(() => cachingHashMap.current.get((e.target.value).toLowerCase()));
      } else {
        getSuggetions(e.target.value);
      }
    }
  }

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <Input
            type="text"
            value={getDisplayValue()}
            placeholder={placeholder}
            name="searchTerm"
            onChange={inputChange}
          />
        </div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {options?.map((option, index) => { 
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option ${
                option[label] === selectedVal ? "selected" : ""
              }`}
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;