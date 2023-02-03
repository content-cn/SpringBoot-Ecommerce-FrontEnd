import React from "react";
import {  Box, Center, Flex, useToast, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { store } from "../../Redux/store";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';
import OrderRecord from "./OrderRecord"

const cookies = new Cookies();

export const GetData = async (user) => {

  if (user == null) {
    user = cookies.get('userData')
  }

  try {

    const config = {
      headers: {
        "userId": user.id,
        "Authorization": user.token
      }
    }

    let response = await axios.get(
      `http://localhost:8080/order/get`,
      config
    );

    console.log("Getting response")
    console.log(response)
    return await response.data;
  } catch (err) {
    return err;
  }
};

const OrderPage = () => {
  const { userData } = useSelector((store) => store.AuthManager);
  const toast = useToast();
  const [count, setCount] = useState(1);

  let totalPrice = 0;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setLoading(true);
    GetData(userData)
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
    <div>
      {/* <Box border={"0px solid black"} height="140px"></Box> */}
      <Flex
        border={"0px solid red"}
        margin="auto"
        width={"95%"}
        paddingX="20px"
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
      >
        <Flex
          flexDirection={"column"}
          border={"0px solid blue"}
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "70%",
            xl: "70%",
            "2xl": "70%",
          }}
          gap={"4"}
        >
          {loading && (
            <Center>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </Center>
          )}
          <Heading
            fontSize="18px"
            color={"rgb(102, 102, 102)"}
            fontWeight="600"
            lineHeight={"1.1"}
          >
            Orders
          </Heading>
          {data &&
            data.filter(item => item.totalPrice != 0 ).map((item) => {
              return (
                <>
                  <OrderRecord
                    orderId={item.id}
                    timestamp={item.createdDate}
                    price={item.totalPrice}
                    address={item.address}
                    orderItems={item.orderItems}
                  />
                </>
              );
            })}
        </Flex>
        <Flex
          border={"0px solid green"}
          width={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "30%",
            xl: "30%",
            "2xl": "30%",
          }}
        >
        </Flex>
      </Flex>
    </div>
  );
};

export default OrderPage;