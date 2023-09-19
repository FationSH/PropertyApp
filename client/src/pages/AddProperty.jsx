import React, { useContext, useState } from "react";
import { AppContext } from "../components/AppContextProvider";
import SearchableDropdown from "../components/SearchableDropdown";
import axios from "axios";
import { baseLink } from "../main";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Textarea,
    Select,
  } from "@chakra-ui/react";

  /**
   * Add Property Form. Handle Submit.
   */
function AddProperty() {
    const navigate = useNavigate();
    const [placeId, setPlaceId] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [area, setArea] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const { isAuth, loading, setIsLoading } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
          const { data } = await axios.post(
            `${baseLink}/property/addProperty`,
            {
              placeId,
              title,
              type,
              area,
              price,
              description,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          toast.success(data.message);

          setIsLoading(false);
          setPlaceId("");
          setTitle("");
          setType("")
          setArea("")
          setPrice("")
          setDescription("");
          navigate("/");
        } catch (error) {
          console.log("error:", error);
          setIsLoading(false);
          toast.error(error.response.data.message);
        }
    }
    
    if (!isAuth) return <Navigate to="/login" />;

    return (
        <Flex
            minH={"100vh"}
            paddingTop={"2rem"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack px={16} >
                <Heading fontSize={"4xl"} textAlign={"left"} paddingBottom={"1rem"}>
                    New property classified
                </Heading>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                    <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            placeholder="Classified title up to 155 chars"
                            maxLength="155"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="type" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select
                            name="type"
                            placeholder="Select type"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="Rent">Rent</option>
                            <option value="Buy">Buy</option>
                            <option value="Exchange">Exchange</option>
                            <option value="Donation">Donation</option>
                        </Select>
                    </FormControl>
                    <FormControl id="area" isRequired>
                        <FormLabel>Area</FormLabel>
                        <SearchableDropdown
                            label="mainText"
                            id="area"
                            selectedVal={area}
                            placeholder={"Type in the property's area"}
                            handleChange={(v) => {
                                setArea(v?.mainText)
                                setPlaceId(v?.placeId)
                            }}
                        />
                    </FormControl>
                    <FormControl id="price" isRequired>
                        <FormLabel>Price</FormLabel>
                        <InputGroup>
                            <Input
                                type="number"
                                placeholder="Amount"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <InputRightAddon children='€' />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Extra Description</FormLabel>
                        <Textarea
                            type="text"
                            placeholder="Type here"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                                bg: "blue.500",
                            }}
                            isDisabled={loading ? true : false}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
  )
}

export default AddProperty;