import React from "react";
import NavBar from "../components/nav";


export default function Blog() {
  const images = [
    "https://i.pinimg.com/736x/95/f6/5e/95f65e07c423781a08328dfac5639446.jpg",
    "https://i.pinimg.com/1200x/a4/75/89/a47589f4173b03d72d63f7bf265484de.jpg",
    "https://i.pinimg.com/webp/1200x/ca/94/90/ca9490bada48c083b3ac4338f46dee09.webp",
    "https://i.pinimg.com/1200x/e6/3d/c5/e63dc5566c205ad683cc8396c091f118.jpg",
    "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg"
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2F1E19] flex justify-center py-24 px-12 selection:bg-[#2F1E19] selection:text-white">
      <div className="w-full flex flex-col items-center">
        
        <section className="relative w-full h-[400px] flex overflow-hidden rounded-[2px] group cursor-pointer shadow-xs">
          <div className="w-1/2 h-full overflow-hidden">
            <img 
              src={images[3]} 
              alt="" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out" 
            />
          </div>
          <div className="w-1/2 h-full overflow-hidden">
            <img 
              src={images[0]} 
              alt="" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out" 
            />
          </div>
          <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex flex-col justify-center items-center transition-all duration-500 group-hover:bg-black/20">
            <h2 className="font-serif italic text-white text-[42px] tracking-wide mb-6 drop-shadow-xs">
              Summer collection
            </h2>
            <button className="border border-white/80 text-white text-[11px] tracking-[0.3em] uppercase px-14 py-3.5 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 transform group-hover:scale-102">
              See all
            </button>
          </div>
        </section>

        <section className="w-full flex flex-col items-center mt-32">
          <div className="w-[90%] flex flex-col items-end mb-12 relative">
            <p className="font-serif italic text-[15px] text-[#2F1E19]/60 tracking-wider absolute -top-4 right-2 mix-blend-multiply">
              Jewelry created with love
            </p>
            <h1 className="font-serif text-[112px] tracking-[0.08em] leading-none text-[#2F1E19] font-light select-none">
              CATALOG
            </h1>
          </div>

          <div className="w-[86%] flex flex-wrap gap-x-[67px] gap-y-[64px]  justify-center p-3">
            <div className="w-[340px] flex flex-col gap-4 group cursor-pointer">
              <div className="w-[340px] h-[390px] overflow-hidden rounded-[2px] bg-[#F5F2EC] shadow-xs">
                <img src={images[0]} alt="" className="w-[340px] h-[390px] object-cover group-hover:scale-103 transition-transform duration-500 ease-out" />
              </div>
              <div className="flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-widest uppercase text-[#2F1E19]/70">View Details</span>
                <span className="text-[11px] font-serif">→</span>
              </div>
            </div>

            <div className="w-[240px] flex flex-col gap-4 group cursor-pointer">
              <div className="w-[240px] h-[320px] overflow-hidden bg-[#F5F2EC] shadow-xs" style={{ borderRadius: "120px 120px 2px 2px" }}>
                <img src={images[1]} alt="" className="w-[240px] h-[320px] object-cover group-hover:scale-103 transition-transform duration-500 ease-out" style={{ borderRadius: "120px 120px 2px 2px" }} />
              </div>
              <div className="flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-widest uppercase text-[#2F1E19]/70">View Details</span>
                <span className="text-[11px] font-serif">→</span>
              </div>
            </div>

            <div className="w-[240px] flex flex-col gap-4 group cursor-pointer">
              <div className="w-[240px] h-[320px] overflow-hidden bg-[#F5F2EC] shadow-xs" style={{ borderRadius: "120px 120px 2px 2px" }}>
                <img src={images[2]} alt="" className="w-[240px] h-[320px] object-cover group-hover:scale-103 transition-transform duration-500 ease-out" style={{ borderRadius: "120px 120px 2px 2px" }} />
              </div>
              <div className="flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-widest uppercase text-[#2F1E19]/70">View Details</span>
                <span className="text-[11px] font-serif">→</span>
              </div>
            </div>

            <div className="w-[240px] flex flex-col gap-4 group cursor-pointer">
              <div className="w-[240px] h-[320px] overflow-hidden bg-[#F5F2EC] shadow-xs" style={{ borderRadius: "120px 120px 2px 2px" }}>
                <img src={images[4]} alt="" className="w-[240px] h-[320px] object-cover group-hover:scale-103 transition-transform duration-500 ease-out" style={{ borderRadius: "120px 120px 2px 2px" }} />
              </div>
              <div className="flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-widest uppercase text-[#2F1E19]/70">View Details</span>
                <span className="text-[11px] font-serif">→</span>
              </div>
            </div>

            <div className="w-[340px] flex flex-col gap-4 group cursor-pointer">
              <div className="w-[340px] h-[390px]  overflow-hidden rounded-[2px] bg-[#F5F2EC] shadow-xs">
                <img src={images[3]} alt="" className="w-[340px] h-[390px] object-cover group-hover:scale-103 transition-transform duration-500 ease-out" />
              </div>
              <div className="flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-widest uppercase text-[#2F1E19]/70">View Details</span>
                <span className="text-[11px] font-serif">→</span>
              </div>
            </div>

            <div className="w-[240px] h-[320px] flex flex-col justify-end items-center pb-8 px-2 text-center">
              <p className="font-serif italic text-[13px] text-[#2F1E19]/70 leading-relaxed mb-6 max-w-[200px]">
                Order your favorite luxury jewelry pieces online.
              </p>
              <button className="w-full border border-[#2F1E19]/40 text-[#2F1E19] text-[11px] tracking-[0.25em] uppercase py-3.5 rounded-[1px] bg-transparent hover:bg-[#2F1E19] hover:text-white hover:border-[#2F1E19] transition-all duration-300 font-medium">
                See all
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}