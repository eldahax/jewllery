import React from "react";

export default function AboutSection() {
  return (
    <section className="w-full flex justify-center items-center py-24 bg-[#F6F4F0]">
      <div className="w-full flex flex-col md:flex-row items-center gap-12 px-6">
        
        <div className="w-full md:w-1/2 flex flex-col gap-6 p-20">
          <h2 className="text-[48px] font-serif text-[#1A080B]">
            ABOUT US
          </h2>

          <p className="text-[13px] text-[#1A080B]/60 leading-relaxed">
            At Celestique, we believe jewelry is more than adornment — it is memory, identity, and form.
          </p>

          <p className="text-[13px] text-[#1A080B]/60 leading-relaxed">
            Every piece is crafted with precision using precious metals and timeless design principles.
          </p>

          <button className="w-fit px-5 py-2 text-[11px] uppercase tracking-widest border border-[#1A080B]/30">
            More About Us
          </button>
        </div>

        <div className="w-full md:w-1/2 h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}