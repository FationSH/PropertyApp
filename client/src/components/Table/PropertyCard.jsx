import React from "react";
import moment from 'moment';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Button } from "@chakra-ui/react";

/**
 * Card fpr displaying property information
 */

const PropertyCard = ({ property, deleteHandler, id }) => {
  return (
    <Card maxW='sm'>
        <CardBody>
            <Image
                src='./public/logo.jpg'
                alt='Home img'
                boxSize='230px'
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'>{property.title}</Heading>
            <Text><b>Type:</b> {property.type}</Text>
            <Text><b>Area:</b> {property.area}</Text>
            <Text><b>Posted:</b> {moment(property.createdAt).format('L')}</Text>
            <Text><b>Description:</b> {property.description}</Text>
            <Text color='blue.600' fontSize='2xl'>
                € {property.price}
            </Text>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                    bg: "blue.500",
                }}
                onClick={() => deleteHandler(id)} >
                    Delete
            </Button>
        </CardFooter>
    </Card>
  );
}

export default PropertyCard;