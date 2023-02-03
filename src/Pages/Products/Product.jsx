import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Product = (props) => {
  const { data, typeOfProduct } = props;
  const { id, name, image, price, maxPrice, category } = data;
  console.log("this is data from the outside hanldewish",data);

  var navigate = useNavigate();
  const toast = useToast();

  return (
    <>
      <Link to={`/${category}/${id}`}>
        <Box>
          <Image src={image} alt={name} p="5" h="200" _hover={{ p: "0" }} />
          <Box
            h="10"
            w="100%"
            color="blue.700"
            lineHeight="120%"
            marginBottom="3"
            textOverflow="ellipsis"
            overflow="hidden"
            _hover={{ color: "red" }}
          >
            {name}
          </Box>
          <Flex
            w="75%"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="2"
          >
            <Heading as="h3" size="xs" color="blue.700">
              ₹{price}
            </Heading>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="blackAlpha.600"
              textDecoration="line-through"
            >
              ₹{maxPrice}
            </Text>
          </Flex>
          <Badge
            borderRadius="full"
            px="2"
            border="1px solid green"
            color="green"
            fontSize="xs"
            marginBottom="10"
          >
            OFFERS AVAILABLE
          </Badge>
        </Box >
      </Link>
    </>
  );
};

export default Product;
