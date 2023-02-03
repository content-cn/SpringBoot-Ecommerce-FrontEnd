import React from "react";
import { Grid, Box } from "@chakra-ui/react";
import { FooterCard1, FooterCard2, FooterCard4 } from "./FooterCard";
import {
  ProductCategories,
  SiteInfo,
  ResourcesCenter,
  Policies,
} from "./FooterDetail";
const Footer = () => {
  return (
    <Box backgroundColor="#003380" color="white" justifyContent="center">
      <FooterCard2 />
      <FooterCard4 />
    </Box>
  );
};

export default Footer;
