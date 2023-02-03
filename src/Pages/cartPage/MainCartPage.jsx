import React from "react";
import {  Box, Center, Flex, useToast } from "@chakra-ui/react";
import MyCartLength from "./MyCartLength";
import CartItem from "./CartItem";
import CheckoutBox from "./CheckoutBox";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { store } from "../../Redux/store";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';

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
      `http://localhost:8080/cart/get`,
      config
    );

    console.log("Getting response")
    console.log(response)
    return await response.data;
  } catch (err) {
    return err;
  }
};

const MainCartPage = () => {
  const { userData } = useSelector((store) => store.AuthManager);
  const toast = useToast();
  const [count, setCount] = useState(1);

  let totalPrice = 0;

  const [data, setData] = useState({
    cartItems: []
  });
  const [loading, setLoading] = useState(false);

  const [extremelyfinalPrice, setExtremelyfinalPrice] = useState(0);
  const amount = useSelector((store) => store.cart.count);


  const DeleteRequest = async (id) => {
    try {

      let user = cookies.get('userData')
      const config = {
        headers: {
          "userId": user.id,
          "Authorization": user.token
        }
      }

      let response = await axios.delete(
        `http://localhost:8080/cart/delete/${id}`,
         config
      );
      GetData(userData).then((res) => {
        return setData(res);
      });
    } catch (err) {
      return err;
    }
  };


    
  let finallyTotalArray = data.totalCost;
  let finallyTotal = data.totalCost;
  console.log("this is the finally total",finallyTotal);
  
  useEffect(() => {
      setExtremelyfinalPrice(finallyTotal);
  },[finallyTotal]);
  console.log("this is extrew",extremelyfinalPrice);


  const handleApply = (totalPrice,val) => {
    totalPrice >= 1000 && val === "MASAI40"
      ? setExtremelyfinalPrice(totalPrice - 500)
      : setExtremelyfinalPrice(totalPrice);
  };


  let newTotalPrice = data && data.cartItems.reduce((acc,elem) => {
    return Number(elem.price) + acc;
  },0);
  console.log("this is the newTotal",newTotalPrice);

  let newA = data.cartItems.map((elem) => {
    console.log("this is from map and price is",Number(elem.price));
  })



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
          <MyCartLength item={data.cartItems.length} />
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
          {data &&
            data.cartItems.map((item) => {
              return (
                <>
                  <CartItem
                    key={item.product.id}
                    name={item.product.name}
                    img={item.product.image}
                    price={item.product.price}
                    id={item.id}
                    DeleteRequest={DeleteRequest}
                  />
                  <Box display={"none"}>
                    {(totalPrice = totalPrice + item.product.price)}
                    
                  
                  </Box>
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
          <CheckoutBox items={data.cartItems.length} totalPrice={extremelyfinalPrice} handleApply={handleApply} />

        </Flex>
      </Flex>
    </div>
  );
};

export default MainCartPage;