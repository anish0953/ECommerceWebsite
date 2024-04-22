import Footer from "../../Components/Footer/Footer";
import MainCarouselHome from "../../Components/Carousel/MainCarouselHome";
import Navbarr from "../../Components/Navbar/Navbarr";
import ProductCarousel from "../../Components/Carousel/ProductCarousel";
import ProductListDashboard from "./DasboardBody/ProductListDashboard";
import React from "react";

const DashBoard = () => {
  return (
    <div>
      <Navbarr />
      <MainCarouselHome />
      <ProductCarousel carouselTitle="Best footwears" />
      <ProductListDashboard />
      <Footer />
    </div>
  );
};

export default DashBoard;
