
"use client";

import { Carousel } from "flowbite-react";

import Slide1 from "../assets/ImagenesBanner/Slidesdocs-Verde.jpg";
import Slide2 from "../assets/ImagenesBanner/bannerColores.webp";
import Slide3 from "../assets/ImagenesBanner/bannerHP.avif";

export function Banner() {
  return (
    <div className="box-border  h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
       
        <img className=" object-cover w-full h-full " src={Slide1} alt="..." />
        {/* <img className="object-cover w-full h-full  " src={Slide2} alt="..." /> */}
        <img className="object-cover w-full h-full" src={Slide3} alt="..." />
       

      </Carousel>
    </div>
  );
}
