import React from "react";

// import Navbar from "../../components/common/Navbar";

import HeroSection from "../../components/home/HeroSection";

import CategorySection
  from "../../components/home/CategorySection";

import FeaturedExhibitions
  from "../../components/home/FeaturedExhibitions";

import FeaturedArtifacts
  from "../../components/home/FeaturedArtifacts";

import TimelinePreview
  from "../../components/home/TimelinePreview";

import Newsletter
  from "../../components/home/Newsletter";

import Footer
  from "../../components/common/Footer";


const Home = () => {

  return (
    <>
      {/* <Navbar /> */}

      <HeroSection />

      <CategorySection />

      <FeaturedExhibitions />

      <FeaturedArtifacts />

      <TimelinePreview />

      <Newsletter />

      <Footer />
    </>
  );
};


export default Home;