
"use client";

import { Carousel } from "flowbite-react";

import Slide1 from "../assets/Imagenes/Notebook Lenovo Loq 2.avif";
import Slide2 from "../assets/Imagenes/slide2.png";

export function Banner() {
  return (
    <div className=" flex items-center justify-center border-4 bg-purple-200 h-[150px] sm:h-[100px] xl:h-[300px] 2xl:h-[300px]">
      <Carousel pauseOnHover>
        <div>
          <iframe className="" width="1200" height="280" align="middle" src="https://www.youtube.com/embed/3jK6zcGCKVA?si=NePixph-f1H00YqG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <img className="object-contain  h-[300px]  bg-purple-200" src={Slide1} alt="..." />
        <img className="bg-purple-200  object-contain h-[300px] " src={Slide2} alt="..." />
        <img className="bg-purple-200 object-contain h-[300px] " src={Slide1} alt="..." />
        <img className="object-contain h-[300px] " src={Slide2} alt="..." />
        <img className="bg-purple-200 object-contain h-[300px] " src={Slide1} alt="..." />
        <img className="object-contain h-[300px]  bg-purple-200" src={Slide2} alt="..." />

      </Carousel>
    </div>
  );
}
