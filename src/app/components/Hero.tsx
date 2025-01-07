'use client';
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Hero = () => {
  const variants = {
    hidden: { x:0, y:70, opacity:0.25 },
    visible: { x:0,y:-10,opacity:1,transition:{ delay: 0.5 } },
  };

  return (
    <div className="w-full md:h-[450px] h-[200px] flex items-center ">
      <div className="h-full md:max-w-[1024px] max-w-[600px] m-auto px-4 md:px-0 flex justify-center items-center relative ">
        <div className="object-cover">
          <Image src="/heroBanner.png" alt="Banner" width={1400} height={100} />
        </div>
        <div className="absolute md:mt-[250px] mt-[150px]">
          <motion.div initial='hidden' animate='visible' variants={variants}>
            <Image
              src="/heroAirpods.png"
              alt="Airpods"
              width={700}
              height={100}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
