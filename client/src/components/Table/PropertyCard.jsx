import React from "react";
import moment from 'moment';
import { Image, Text, Divider, Button, Badge, Box, SimpleGrid } from "@chakra-ui/react";

/**
 * Card fpr displaying property information
 */

const PropertyCard = ({ property, deleteHandler, id }) => {

  const { title, type, area, price, surface, description, levels, createdAt, rooms, bathrooms } = property;

  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <Image src='./public/logo.jpg' alt='Home img' />

    <Box p='6'>
      <Box display='flex' alignItems='baseline'>
        <Badge borderRadius='full' px='2' colorScheme='teal'>
          {type}
        </Badge>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'
          ml='2'
        >
          {rooms} beds &bull; {bathrooms} baths &bull; {surface} ㎡
        </Box>
      </Box>

      <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          pt='5'
        >
          <b>Area:</b> {area} &bull; <b>Levels:</b> {levels} &bull; <b>Posted:</b> {moment(createdAt).format('L')}
        </Box>
      <Box
        mt='1'
        pt='3'
        fontWeight='semibold'
        as='h4'
        lineHeight='tight'
        noOfLines={1}
      >
        {title}
      </Box>
      <Divider />
      <Text pt='3'><b>Description:</b><br/> {description}</Text>
      <SimpleGrid
            pt='8'
            columns={{sm: 1, xl: 2}}
            gap={2}>
        <Text color='blue.600' fontSize='2xl'>
            <b>€ {price}</b>
        </Text>
        <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
                bg: "blue.500",
            }}
            onClick={() => deleteHandler(id)} >
                Delete
        </Button>
        </SimpleGrid>
    </Box>
  </Box>
  );
}

export default PropertyCard;