import React from "react";
import NavBar from "../components/nav"; 
import heroo from "../assets/heroo.png";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

export default function Home() {
  const craftCollection = [
    { id: 1, name: "BRACELET CHERRY", category: "BRACELET", price: "180€", img: "https://i.pinimg.com/1200x/e6/3d/c5/e63dc5566c205ad683cc8396c091f118.jpg" },
    { id: 2, name: "SIMUÉRO RING", category: "RING", price: "210€", img: "https://i.pinimg.com/1200x/a4/75/89/a47589f4173b03d72d63f7bf265484de.jpg" },
    { id: 3, name: "SEASHELL NECKLACES", category: "NECKLACE", price: "260€", img: "https://i.pinimg.com/736x/95/f6/5e/95f65e07c423781a08328dfac5639446.jpg" },
    { id: 4, name: "SOLARA RING", category: "RING", price: "195€", img: "https://i.pinimg.com/webp/1200x/6e/38/2b/6e382b1d419c9a80bd889cc0dfdb6c61.webp" },
  ];

  const bestSellers = [
    { id: 5, name: "AURA EARRINGS", price: "140€", img: "https://i.pinimg.com/webp/1200x/ca/94/90/ca9490bada48c083b3ac4338f46dee09.webp" },
    { id: 6, name: "ORBIT RING", price: "220€", img: "https://i.pinimg.com/webp/736x/de/5d/2d/de5d2dd3d0eaaad41ecd51d697515563.webp" },
    { id: 7, name: "ECLIPSE PENDANT", price: "310€", img: "https://i.pinimg.com/736x/10/96/3e/10963e324d596898b478842f665f4384.jpg" },
    { id: 8, name: "FAUNA RING", price: "185€", img: "https://i.pinimg.com/1200x/00/56/ad/0056addb8208393d338833e2d72eb89d.jpg" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FCFBF9] text-[#1A080B] font-sans antialiased selection:bg-[#4A0E17] selection:text-white">
      <NavBar></NavBar>

      <section className="relative w-full h-[80vh] md:h-[90vh] bg-[#3B2314] overflow-hidden flex flex-col justify-end items-center text-center p-8">
        <img
          src={heroo}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />
        <div className="relative z-10 max-w-2xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase text-white mb-6 drop-shadow-sm">
            CELESTE-GOLD
          </h1>
          <Link to="/shop" className="text-xs uppercase tracking-[0.4em] text-white/90 border-b border-white/40 pb-2 hover:text-white hover:border-white transition-all duration-300">
            Shop now
          </Link>
        </div>
      </section>

      <section id="shop" className="py-16 md:py-24 px-6 md:px-12 border-b border-[#1A080B]/10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#1A080B] font-light max-w-md">
            Creating, Crafting & Wearing.
          </h2>
          <p className="text-xs text-[#1A080B]/60 max-w-sm leading-relaxed font-serif italic">
            Kolica-Gold embodies our team and the desire for collective growth, and thoughtful decisions that lead us down paths that are comfortable and peaceful.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-10 justify-between">
          {craftCollection.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-[#F5F3EE]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="bg-[#FCFBF9] text-[#1A080B] text-[10px] tracking-widest uppercase py-2 px-4 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Discover
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-1 text-[11px] tracking-widest uppercase">
                <span className="text-[#1A080B]/80 font-medium truncate">{item.name}</span>
                <span className="text-[#1A080B]/50">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full min-h-[70vh] lg:min-h-[90vh] bg-[#2A1A14] flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 text-white p-8 md:p-20 flex flex-col justify-center items-start">
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight max-w-md leading-tight">
            Emotion embraces technique.
          </h2>
          <p className="mt-8 text-sm leading-relaxed max-w-md font-serif text-white/80">
            Our core is craftsmanship and daily conversation with our tools. We
            thrive on teamwork, the pursuit of excellence, while maintaining the
            freedom to decide when and how to launch collections.
          </p>
        </div>
        <div
          className="w-full lg:w-1/2 min-h-[400px] lg:min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg')",
          }}
        />
      </section>

      <section className="py-16 md:py-24 lg:pb-32 px-6 md:px-12 border-b border-[#1A080B]/10">
        <div className="flex justify-between items-end border-b border-[#1A080B]/10 pb-4 mb-12">
          <h2 className="text-2xl md:text-4xl font-serif font-light tracking-tight text-[#1A080B]">
            Bestsellers
          </h2>
          <a
            href="#all"
            className="text-xs uppercase tracking-widest text-[#D4AF37] hover:text-[#1A080B] transition-colors font-medium"
          >
            View All →
          </a>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-12">
          {bestSellers.map((item, idx) => (
            <div
              key={item.id}
              className={`group cursor-pointer w-[calc(50%-12px)] lg:w-[calc(25%-18px)] transition-transform duration-500 ${
                idx % 2 === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <div className="aspect-[3/4] bg-white border border-[#1A080B]/5 overflow-hidden p-6 flex items-center justify-center rounded-[4px] relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-1 text-[11px] tracking-widest uppercase">
                <span className="text-[#1A080B]/80 font-medium truncate">{item.name}</span>
                <span className="text-[#1A080B]/50">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="py-20 md:py-28 px-6 md:px-12 bg-white flex flex-col lg:flex-row gap-12 lg:gap-20 items-center border-b border-[#1A080B]/10"
      >
        <div className="w-full lg:w-[45%] aspect-square md:aspect-[3/4] lg:aspect-square bg-[url('https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg')] bg-cover bg-center rounded-[4px]" />

        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#1A080B]">
            We believe in our process
          </h2>
          <p className="text-xs md:text-sm text-[#1A080B]/70 font-serif leading-relaxed max-w-md">
            Every piece is conceptualized, built, and polished directly in house. Our philosophy centers surrounding small batch production runs avoiding over-manufacturing footprint while ensuring each asset retains custom boutique authenticity.
          </p>
          <div className="pt-2">
            <a
              href="#about"
              className="text-xs uppercase tracking-widest text-[#1A080B] border-b border-[#1A080B] pb-1 font-semibold hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
            >
              About Us
            </a>
          </div>
        </div>
      </section>

      
<Footer></Footer>
  
    </div>
  );
}