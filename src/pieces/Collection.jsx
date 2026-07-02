import React from "react";

export default function PremiumCollection({ premiumCollection }) {
  return (
    <>
      <section 
        className="w-[1200px] min-h-[650px] bg-[#2C1E1A] flex flex-col items-center pt-12 px-12 relative overflow-hidden mb-20 shadow-sm pb-16"
        style={{ borderRadius: "140px 140px 0px 0px" }}
      >
        <div className="text-center text-white mb-12">
          <h2 className="font-serif text-[24px] tracking-[0.25em] font-light uppercase">
            DAVID YURMAN
          </h2>
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/50 mt-1.5 font-medium">
            EXCLUSIVES
          </p>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-x-[40px] gap-y-12 px-4">
          {premiumCollection && premiumCollection.map((product) => (
            <div key={product.id} className="w-[330px] flex flex-col items-center text-center group cursor-pointer relative">
              <div className="w-[330px] h-[360px] bg-[#FCFBF9]/95 flex items-center justify-center p-6 shadow-xs rounded-[2px] transition-transform duration-500 group-hover:-translate-y-1 relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="max-w-[260px] max-h-[300px] object-contain mix-blend-multiply group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              
              <p className="font-serif text-white/70 text-[12px] font-light leading-relaxed mt-5 max-w-[290px] h-[40px] overflow-hidden transition-colors group-hover:text-white">
                {product.name}
              </p>
              <p className="font-sans text-[#E3CBB3] font-medium text-[13px] tracking-widest mt-2">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}