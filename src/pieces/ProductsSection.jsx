import React from "react";

export default function ProductsSection() {
  const categories = [
    { name: "Rings", img: "https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg" },
    { name: "Earrings", img: "https://i.pinimg.com/736x/1c/5f/7a/1c5f7a3a9b0f9c9b2c0d2d3c2b9d2a1.jpg" },
    { name: "Necklaces", img: "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg" },
    { name: "Bracelets", img: "https://i.pinimg.com/736x/9a/6b/2c/9a6b2c7f1c2a4f0d9e8b1c7d4f5a6b7c.jpg" },
  ];

  return (
    <section className="w-full flex flex-col items-center py-24 bg-[#F6F4F0]">
      
      <h2 className="text-[56px] font-serif tracking-wide text-[#1A080B] mb-16">
        OUR PRODUCTS
      </h2>

      <div className="w-full  flex flex-col">

        <div className="flex ">
          {categories.slice(0, 2).map((cat, index) => (
            <div
              key={index}
              className="w-1/2 h-[600px] relative overflow-hidden group cursor-pointer"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[11px] tracking-[0.3em] uppercase opacity-70">
                  Shop
                </p>
                <h3 className="text-[22px] font-serif">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex ">
          {categories.slice(2, 4).map((cat, index) => (
            <div
              key={index}
              className="w-1/2 h-[600px] relative overflow-hidden group cursor-pointer"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/10" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[11px] tracking-[0.3em] uppercase opacity-70">
                  Shop
                </p>
                <h3 className="text-[22px] font-serif">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}