
import {Center, Box, Button, Flex, Grid, GridItem, Heading, Image, Input, ListItem, Text, UnorderedList, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ProfilePage = (props) => {

  let userData = cookies.get('userData')

  console.log(userData);

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
            

            <GridItem
              colSpan={[4, 6, 6]}
              rowSpan={1}
              p={5}

            >
              <Text color="gray.500" marginBottom={5}>
                User ID: {userData.id}
              </Text>
              <Heading size="sm" marginBottom={3}>
                Name
              </Heading>
              <Heading size="md" marginBottom={5}>
                {userData.name}
              </Heading>
              <Heading size="sm" marginBottom={3}>
                Details: 
              </Heading>
              <UnorderedList color="gray.600" fontSize="sm" marginBottom={4}>
                <ListItem>
                  Email ID: {" "}
                  <span style={{ color: "#2871c4" }}>{userData.email}</span>
                </ListItem>
                <ListItem>
                  Email ID: {" "}
                  <span style={{ color: "#2871c4" }}>{userData.username}</span>
                </ListItem>
                <ListItem>
                  Name: {" "}
                  <span style={{ color: "#2871c4" }}>{userData.name}</span>
                </ListItem>
              </UnorderedList>
            </GridItem>

           
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
