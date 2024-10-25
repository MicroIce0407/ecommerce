import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import shop1 from "../../picture/shop1.jpg";
import shop2 from "../../picture/shop2.jpg";
import shop3 from "../../picture/shop3.jpg";
import shop4 from "../../picture/shop4.jpg";
import shop5 from "../../picture/shop5.jpg";
import shop6 from "../../picture/shop6.jpg";
import shop7 from "../../picture/shop7.jpg";
import shop8 from "../../picture/shop8.jpg";
import shop9 from "../../picture/shop9.jpg";
import shop21 from "../../picture/shop21.jpg";
import shop31 from "../../picture/shop31.jpg";

export default function ScrollImg() {
  const images = [
    shop1,
    shop2,
    shop3,
    shop4,
    shop5,
    shop6,
    shop7,
    shop8,
    shop9,
  ];

  return (
    <>
      <section className="mt-5 mb-5 mx-[5%] flex flex-wrap lg:flex-nowrap gap-6">
        <section className="w-full lg:w-2/3 p-2 flex items-center">
          <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
            {images.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={image}
                  alt={`shop${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </section>

        <section className="w-full lg:w-1/3 flex flex-col gap-6 p-2">
          <div className="w-full h-48 lg:h-1/2 bg-black rounded-lg shadow-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={shop21}
              alt="shop21"
            />
          </div>
          <div className="w-full h-48 lg:h-1/2 bg-black rounded-lg shadow-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={shop31}
              alt="shop31"
            />
          </div>
        </section>
      </section>
    </>
  );
}
