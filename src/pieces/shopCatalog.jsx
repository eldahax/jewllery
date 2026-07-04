import React from "react";

export default function Catalog({ categories, onCategoryClick }) {
  return (
    <>
      <section id="catalog-section" className="w-[100%] flex flex-col items-center mt-28 mb-4 relative">
        <div className="w-full flex flex-col items-center relative">
          <p className="font-serif italic text-[15px] text-[#1A080B]/50 tracking-wider translate-y-2">
            Jewelry created with love
          </p>
          <h1 className="font-serif text-[112px] tracking-[0.12em] leading-none text-[#1A080B] font-light">
            CATALOG
          </h1>
        </div>
      </section>

      <section className="w-[99%] pb-24 px-12 flex flex-wrap justify-center gap-x-[63px] gap-y-[65px]">
        {categories && categories.map((cat, idx) => (
          <div 
            key={cat.type || idx} 
            onClick={() => onCategoryClick(cat.type)} 
            className="w-[400px] flex flex-col items-center group cursor-pointer"
          >
            <h3 className="font-serif text-[14px] tracking-[0.2em] text-[#1A080B]/80 mb-4 font-light uppercase transition-colors group-hover:text-[#5C4033]">
              {cat.name}
            </h3>
            <div 
              className="w-[400px] h-[340px] overflow-hidden bg-[#F5F3EE] shadow-xs transition-all duration-500 group-hover:shadow-md"
              style={{ borderRadius: cat.arched ? "140px 140px 2px 2px" : "2px" }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-[380px] h-[340px] object-cover group-hover:scale-103 transition-transform duration-700 ease-out shadow-md"
                style={{ borderRadius: cat.arched ? "140px 140px 2px 2px" : "2px" }}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}