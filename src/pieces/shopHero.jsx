import React from 'react';

export default function ShopHero() {
  return (
    <>
      <section className=" relative w-[100%] h-[84vh] bg-[#E8E2DA] overflow-hidden flex flex-col justify-between items-center p-12">
        <img
          src="https://i.pinimg.com/736x/d1/3e/11/d13e11681b1735c504aa12f5b8a31204.jpg"
          alt="Hero Editorial"
          className="absolute inset-0 w-[100%] h-full object-cover brightness-90"
        />
        
       <div
  className="absolute bottom-0 left-0 right-0 h-[70px] bg-[#FCFBF9] "
  style={{
    clipPath:
      "polygon(0 60%, 10% 50%, 25% 65%, 40% 35%, 60% 70%, 75% 45%, 90% 60%, 100% 50%, 100% 100%, 0 100%)",
  }}
/>
        
        <div className="relative z-10 w-full flex flex-col items-end text-right mt-32 pr-12">
          <h2 className="font-serif text-white text-[32px] font-light leading-snug tracking-wider drop-shadow-xs">
            TIMELESS WHISPERS <br /> OF <span className="italic font-normal">Elegance</span>
          </h2>
        </div>
        
        <div className="relative z-10 mb-8">
          <button 
            onClick={() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-white text-white font-sans text-[12px] tracking-[0.25em] uppercase px-10 py-3 bg-black/10 backdrop-blur-xs hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
          >
            SHOP NOW
          </button>
        </div>
      </section>
    </>
  );
}