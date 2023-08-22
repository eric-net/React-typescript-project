import React, { useEffect} from "react";
import { Header } from "./Header/Header";

import { Welcome } from "./Welcome/Welcome";
import JobPortal from "../components/HiringTeam/JobPortal/JobPortal";
import HiringTeam from "./HiringTeam/HiringTeam";
import JobsCategories from "./HiringTeam/JobsCategories/JobsCategories";



const Home = () => {
    
  return (
    <>
      <Header />
    
      <main id="main">
        {/* <Welcome /> */}
              <HiringTeam>
              <JobsCategories />
          </HiringTeam >
      
      </main>
     
    </>
  );
};

export default Home;