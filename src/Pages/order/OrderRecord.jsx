import React, { useState } from "react";
import { Flex, Box, Image, Button, Heading, useToast } from "@chakra-ui/react";
import { FcPlus } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { INC, DEC } from "../../Redux/Cart/cart.types";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const OrderRecord = ({ orderId, timestamp, price, address, orderItems }) => {
  const toast = useToast();

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  var navigate = useNavigate();


  // const count = useSelector(store => store.cart.count)

  const handleInc = () => {
    setCount(count + 1);
    //dispatch({type:INC})
  };
  const handleDec = () => {
    count > 1 && setCount(count - 1);
    //dispatch({type:DEC})
  };


  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var tomorrow = new Date();
  tomorrow.setTime(tomorrow.getTime() + 1000 * 3600 * 24);
  var dayName = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var monName = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );
  var now = new Date();
  var dtString =
    dayName[now.getDay()] +
    ", " +
    monName[now.getMonth()] +
    " " +
    now.getDate();
  var change =
    months[tomorrow.getMonth()] +
    " " +
    tomorrow.getDate() +
    ", " +
    tomorrow.getFullYear();
  return (
    <Flex
      key={orderId}
      border={"1px solid rgb(224, 224, 225)"}
      flexDirection="column"
      width={"90%"}
      boxShadow={"rgb(0 0 0 / 6%) 0px 2px 2px"}
      borderRadius="4px"
    >
      <Flex
        p={"16px"}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        justifyContent={{ sm: "center", base: "center" }}
        alignItems={{
          sm: "center",
          md: "normal",
          lg: "normal",
          xl: "normal",
          "2xl": "normal",
        }}
        gap={{ sm: "8px", base: "7px" }}
      >
        {/* //part1-17to 44line */}
        <Flex
          flexDirection="column"
          border={"0px solid blue"}
          justifyContent="center"
          alignItems={"center"}
          gap="2"
        >
          <Box>
            {/* <Image src={img} alt={orderId} width="200px" /> */}
          </Box>
          {/* <Box display={"flex"} gap="2">
            <Button onClick={handleDec}>-</Button>
            <Button
              backgroundColor={"white"}
              disabled={true}
              fontWeight={"bold"}
            >
              {count}
            </Button>
            <Button onClick={handleInc}>+</Button>
          </Box> */}
        </Flex>
        {/* //part2-line 46 to 71 */}
        <Flex
          flexDirection={"column"}
          border={"0px solid green"}
          textAlign={{
            sm: "center",
            md: "left",
            lg: "left",
            xl: "left",
            "2xl": "left",
          }}
          gap={2}
        >
          <Heading
            fontSize="14px"
            color={" rgb(0, 51, 128)"}
            fontWeight="600"
            lineHeight={"1.1"}
          >
            Order ID: {orderId}
          </Heading>
          <Heading
            fontSize="14px"
            color={"rgb(102, 102, 102)"}
            fontWeight="600"
            lineHeight={"1.1"}
          >
            Order Date: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)}
          </Heading>
        </Flex>
        {/* //part3- line 71 to 99*/}
        <Flex
          flexDirection={"column"}
          textAlign={{
            sm: "center",
            md: "right",
            lg: "right",
            xl: "right",
            "2xl": "right",
          }}
          gap={1}
          fontWeight="500"
        >
          <Heading fontSize="14px" color={"rgb(0, 0, 0)"}>
            Total Price: {price}
          </Heading>
          <Heading
            fontSize="14px"
            color={"rgb(21, 150, 124)"}
            lineHeight={"1.5"}
          >
            {" "}
            Ordered Items: {orderItems.length}
          </Heading>
          {address && <Flex justifyContent="flex-end">
            <TbTruckDelivery size={20} />
            <Heading
              fontSize="13px"
              color={"rgb(0, 51, 128)"}
              lineHeight={"20px"}
            >
              Address: {address.city}, {address.state}
            </Heading>
          </Flex>}
        </Flex>
      </Flex>
     
    </Flex>
  );
};

export default OrderRecord;