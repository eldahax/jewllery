import React from 'react';

export default function ShopHero() {
  return (
    <>
      <section className="mt-[20px] relative w-[1200px] h-[600px] bg-[#E8E2DA] overflow-hidden flex flex-col justify-between items-center p-12 shadow-xs">
        <img
          src="https://i.pinimg.com/webp/1200x/52/3b/2d/523b2de5450af1d20fadac3145fb4870.webp"
          alt="Hero Editorial"
          className="absolute inset-0 w-[1200px] h-[600px] object-cover brightness-95"
        />
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-[60px] bg-[#FCFBF9]" 
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
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