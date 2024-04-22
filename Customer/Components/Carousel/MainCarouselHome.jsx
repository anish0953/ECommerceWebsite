import Carousel from "react-bootstrap/Carousel";
import carimg1 from "../../../Assets/Carousel1.webp";
import carimg2 from "../../../Assets/Carousel2.webp";
import carimg3 from "../../../Assets/Carousel3.png";
import carimg4 from "../../../Assets/Carousel4.webp";

export default function MainCarouselHome() {
  return (
    <Carousel style={{ margin: "20px 0" }}>
      <Carousel.Item interval={1000}>
        <img className="d-block w-100 carousel-image" src={carimg2} alt="Two" />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img className="d-block w-100 carousel-image" src={carimg4} alt="Two" />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img className="d-block w-100 carousel-image" src={carimg1} alt="One" />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img className="d-block w-100 carousel-image" src={carimg3} alt="Two" />
      </Carousel.Item>
    </Carousel>
  );
}
