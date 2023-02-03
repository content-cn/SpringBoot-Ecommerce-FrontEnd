import React from "react";
import SlideMenu from "./SlideMenu";
import MenuCard from "./MenuCard"
import {
  ItemDetails2,
} from "./CardDetails";
import { Box } from "@chakra-ui/react";
import axios from "axios";


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      HomeData: {},
    }
  }

  componentDidMount () {
    this.getHomePage();

  }
  
  getHomePage = () => {
    const that = this;
    axios.get('http://localhost:8080/home')
    .then(res => {
      const homeData = res.data;
      that.setState({HomeData: homeData})
    })
  }

  render()
  {

    const items = []
    const homeData = this.state.HomeData;
    for (let category in homeData) {
      console.log(homeData[category])
      items.push(<MenuCard type={homeData[category]} heading={category + " | " }/>)
    }

    console.log(homeData)
    console.log(items)

    return (
      <Box>
        {/* <ItemCard1 type={ItemDetails1} /> */}
        <SlideMenu type={ItemDetails2} />
        <div>
          {items}
        </div>
        {/* <ItemCard5 type={TodaysDeals} heading="Today's Deal | " /> */}        
      </Box>
    );
  }
}

export default Home;
