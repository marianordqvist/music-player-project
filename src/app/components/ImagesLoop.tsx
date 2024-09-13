"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Image1 from "./../../../public/songs-dark-big.png";
import Image2 from "./../../../public/songs-dark-big-2.png";
import Image3 from "./../../../public/songs-dark-big-3.png";
import Image1Mid from "./../../../public/songs-dark-small.png";
import Image2Mid from "./../../../public/songs-dark-small-2.png";
import Image3Mid from "./../../../public/songs-dark-small-3.png";

export default function ImagesLoop() {
  const [screenSize, setScreenSize] = useState("md");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setScreenSize("md");
      } else {
        setScreenSize("lg");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenSize === "lg") {
    return <ImagesLoopBig />;
  } else {
    return <ImagesLoopMid />;
  }
}

function ImagesLoopBig() {
  const images = [Image1, Image2, Image3];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const animation = ``;

  return (
    <div className="">
      <Image
        src={images[imageIndex]}
        alt="Image of music cards, every two seconds the cards change to other songs"
        width={550}
        height={300}
        className={`${animation} object-cover w-full h-auto`}
      />
    </div>
  );
}

function ImagesLoopMid() {
  const images = [Image1Mid, Image2Mid, Image3Mid];
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const animation = `animate__animated animate__bounceIn`;

  return (
    <div className="">
      <Image
        src={images[imageIndex]}
        alt="Image of music cards, every two seconds the cards change to other songs"
        width={769}
        height={1045}
        className={`${animation} w-full h-auto`}
      />
    </div>
  );
}
