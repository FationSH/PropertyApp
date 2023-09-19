import React from "react";
import PropertyCard from "./PropertyCard"
import { SimpleGrid  } from "@chakra-ui/react";

/**
 * Grid with all properties.
 * Adjust columns depending on the screen size.
 */
const PropertyList = ({ properties, deleteHandler }) => {
  return (
    <SimpleGrid 
      columns={{sm: 1, md: 2, xl: 4}}
      gap={6}
      padding={"5%"}>
      {properties?.map((property) => (
        <PropertyCard
          key={property._id}
          property={property}
          deleteHandler={deleteHandler}
          id={property._id}
        />
      ))}
    </SimpleGrid >
  );
}

export default PropertyList;
