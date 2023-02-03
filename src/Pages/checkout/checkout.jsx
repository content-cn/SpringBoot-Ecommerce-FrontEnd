import {useDisclosure, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter, Input, Flex, useToast, Grid, GridItem, RadioGroup, Radio } from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Cookies from 'universal-cookie';
import axios from "axios";
import { useEffect } from "react";
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





const Checkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState(null)

  const AddressSaveRequest = async (addressData) => {
    try {
  
      let user = cookies.get('userData')
      const config = {
        headers: {
          "userId": user.id,
          "Authorization": user.token
        }
      }
  
      addressData["userId"] = user.id;
  
      let response = await axios.post(
        `http://localhost:8080/address`,
         addressData,
         config
      );
      GetData().then((res) => {
        return setData(res);
      });
    } catch (err) {
      return err;
    }
  };

  const address=useRef({})
  const toast = useToast()
  const {firstName,lastName,mobile,pincode,flat,setflat,state,setstate,street,setstreet,city,setcity,}=useContext(AppContext)
  const handleAddress=(address)=>{
    setflat(address.flat.value);
    setstate(address.state.value);
    setstreet(address.street.value);
    setcity(address.city.value);

    AddressSaveRequest(address)
  }


  const handleSelectAddress =(address)=>{
    setSelectedAddress(address)
    cookies.set('SelectedAddressId', address.id)
  }

  const navigate=useNavigate()

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
    <div style={{backgroundColor:"#f1eeee" }}>
    <Box width="90%" margin="auto" backgroundColor="white" boxShadow='base'>
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          <Text fontSize='3xl'>Shipping address</Text>
        </Box>
          
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {(data.length===0)&&<Box>No address found</Box>}
      
      <RadioGroup onChange={setSelectedAddress}>
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
              <Radio value={elem.id + "address"} onClick={() => handleSelectAddress(elem)}></Radio>
                <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic" >Name: </Text><Text > {elem.firstName} {elem.lastName}</Text></Flex>
                <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">Flat: </Text><Text > {elem.flat}</Text></Flex>
                <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">Street: </Text><Text > {elem.street}</Text></Flex>
                <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">City: </Text><Text > {elem.city}</Text></Flex>
                <Flex width="300px" justifyContent="space-between"><Text fontWeight="bold" fontStyle="italic">State: </Text><Text > {elem.state}</Text></Flex>
                
              </Box>
            </GridItem>
          );
        })}
      </RadioGroup>
      
      
      {(selectedAddress)&&<Button onClick={()=>navigate("/payments")} colorScheme='blue' variant='outline'>Proceed to payments</Button>}
      {(!selectedAddress)&&<Button onClick={onOpen} colorScheme='blue' variant='outline'>Add a new shipping address</Button>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex flexDirection="column" gap="1rem">
              <Input placeholder='Pincode*' ref={(e)=>address["pincode"]=e} />
              <Flex gap="1rem">
              <Input placeholder='Enter First Name*' ref={(e)=>address["firstName"]=e} />
              <Input placeholder='Enter Last Name*' ref={(e)=>address["lastName"]=e} />
              </Flex>
              <Input placeholder='Enter Flat / Building Name*' ref={(e)=>address["flat"]=e}/>
              <Input placeholder='Enter  Colony / Street*' ref={(e)=>address["street"]=e}/>
              <Input placeholder='Enter Landmark' ref={(e)=>address["landmark"]=e}/>
              <Flex gap="1rem">
              <Input placeholder='Enter City*' ref={(e)=>address["city"]=e}/>
              <Input placeholder='Enter State*' ref={(e)=>address["state"]=e}/>
              </Flex>
              <Flex gap="1rem">
              <Input placeholder='Enter mobile number*' ref={(e)=>address["mobile"]=e}/>
              <Input placeholder='Enter landline number*' ref={(e)=>address["land"]=e}/>
              </Flex>
              </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant='ghost' onClick={(address)=>{
              handleAddress(address);
          if(flat!==""&&state!==""&&city!==""&&street!=="")
          {          toast({
          title: 'Address successfully added.',
          description: "We'll use this for further communication.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) 
        // navigate("/checkout")
        }
        // else
        // setfirst(true)
        }}>SUBMIT</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
</Box>
</div>
  )
}

export default Checkout