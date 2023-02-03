import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Products/Product";
import { Box, Grid, GridItem, Heading , Center, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Products/products.action";
import { RotatingLines } from "react-loader-spinner";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const GetData = async () => {

  try {
    let pattern = cookies.get('searchKey');

    let response = await axios.get(
      `http://localhost:8080/home/search?pattern=${pattern}`
    );

    console.log("Getting response")
    console.log(response)
    return await response.data;
  } catch (err) {
    return err;
  }
};


const SearchPage = ({ pattern }) => {
  // const [productArr, setProductArr] = useState([]);
  const productsList = useSelector((store) => store.product.data);
  const [data, setData] = useState(new Map());
  const toast = useToast()
  
  console.log("in the products page and the products list", productsList);

  const [loading, setLoading] = useState(false);
  const error = useSelector((store) => store.product.error);

  const dispatch = useDispatch();
   console.log("in the products page and productlist is :-",data,"loading status is:- ",loading,"error status is :-",error);

  const category = {
    mobilesandtablets: "MOBILES AND TABLETS",
    televisions: "TELEVISIONS",
    headphones: "HEADPHONES",
    homeappliances: "HOME-APPLIANCES",
    computers: "COMPUTERS",
    cameras: "CAMERAS",
    kitchen: "KITCHEN-APPLIANCES",
    personalcare: "PERSONAL-CARE",
    accessories: "ACCESSORIES",
    whishlist:"whishlist"
  };

  useEffect(() => {
    setLoading(true);
    let pattern = ""
    GetData(pattern)
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

  if (error) {
    return (
      <Heading
        size="3xl"
        textAlign="center"
        color="red.500"
        marginTop={10}
        marginBottom="200px"
      >
        Some thing went wrong...
      </Heading>
    );
  }

  const productsListItems = []
  const homeData = data;
  for (let category in homeData) {
    console.log(homeData[category])
    for (let product of homeData[category]) {
      productsListItems.push(product);
    }
  }

  return (
    <Box p="5">
      <Heading p="5" marginBottom={5}>
        {pattern}
      </Heading>
      {loading ? (
          <Box h={20}>
        <Center>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            // width="150"
            height={20}
            visible={true}
            />
        </Center>
          </Box>
      )
      : (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
            "repeat(5,1fr)",
          ]}
          gap={3}
        >
          {
            Object.getOwnPropertyNames(data).map((entry) => {
               let key = entry;
               let value = data[key]
               return value.map((elem, i) => {
                console.log("in the products page in the map method and elem is :- ", elem);
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
                    <Product data={elem} typeOfProduct={key} />
                  </GridItem>
                );
              })
            })
            
          }
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;
