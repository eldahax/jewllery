import React from "react";

export default function ProductsSection() {
  const categories = [
    { name: "Rings", img: "https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg" },
    { name: "Earrings", img: "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg" },
    { name: "Necklaces", img: "https://i.pinimg.com/736x/aa/e7/0d/aae70d25566bb4be327e854e82f50b34.jpg" },
    { name: "Bracelets", img: "https://i.pinimg.com/736x/2f/00/52/2f005200c458f8df349054351e7411db.jpg" },
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
              className="w-1/2 h-[500px] relative overflow-hidden group cursor-pointer"
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
              className="w-1/2 h-[500px] relative overflow-hidden group cursor-pointer"
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