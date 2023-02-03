
import {Center, Box, Button, Flex, Grid, GridItem, Heading, Image, Input, ListItem, Text, UnorderedList, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect} from 'react';
import Cookies from 'universal-cookie';
import { useState } from "react";

const cookies = new Cookies();

export const GetData = async () => {

  let user = cookies.get('userData')

  try {
    const config = {
      headers: {
        "Authorization": user.token
      }
    }

    let response = await axios.get(
      `http://localhost:8080/address/byUser/${user.id}`,
      config
    );

    console.log("Getting response")
    console.log(response)
    return await response.data;
  } catch (err) {
    return err;
  }
};

const AddressPage = (props) => {

  let userData = cookies.get('userData')
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast()

  useEffect(() => {
    setLoading(true);
    GetData()
      .then((res) => {
        setData(res);
        setLoading(false);
       
      })
      .catch((err) => {
        toast({
          title: "Something Went Wrong",
          description: `${err.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          variant: "top-accent",
          position: "top",
        });
      });
  }, []);

  return (
    <>
      {!userData ? (
        <Heading
          size="3xl"
          textAlign="center"
          color="red.500"
          marginTop={10}
          marginBottom="200px"
        >
          Invalid user...
        </Heading>
      ): (
        <Box marginTop={12}>
          <Grid
            h={["1300px", "1100px", "600px"]}
            templateRows={[
              "repeat(8, 1fr)",
              "repeat(8, 1fr)",
              "repeat(8, 1fr)",
            ]}
            templateColumns={[
              "repeat(4, 1fr)",
              "repeat(6, 1fr)",
              "repeat(10, 1fr)",
            ]}
          >
            

            {data.map((elem, i) => {
              return (
                <GridItem
                  key={elem.name + i}
                  w="100%"
                  bg="white.500"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 2px 8px"
                  padding="25px 25px 0px 25px"
                  _hover={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <Heading my="4px" >Address #{i+1}</Heading>
                    <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic" >Name: </Text><Text > {elem.firstName} {elem.lastName}</Text></Flex>
                    <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">Flat: </Text><Text > {elem.flat}</Text></Flex>
                    <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">Street: </Text><Text > {elem.street}</Text></Flex>
                    <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">City: </Text><Text > {elem.city}</Text></Flex>
                    <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">State: </Text><Text > {elem.state}</Text></Flex>
                    
                  </Box>
                </GridItem>
              );
            })}

           
          </Grid>
        </Box>
      )}
    </>
  );
};

export default AddressPage;
