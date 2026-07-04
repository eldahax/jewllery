import React, { useState } from "react";

export default function JewelryGrid() {
  const posts = [
    {
      id: "post-1",
      title: "Gold Layer Necklace",
      subtitle: "18K | handcrafted",
      category: "necklaces",
      price: "$240",
      img: "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg",
    },
    {
      id: "post-2",
      title: "Signature Diamond Ring",
      subtitle: "white gold | pavé set",
      category: "rings",
      price: "$1,200",
      img: "https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg",
    },
    {
      id: "post-3",
      title: "Minimal Diamond Studs",
      subtitle: "18K gold | everyday wear",
      category: "earrings",
      price: "$450",
      img: "https://i.pinimg.com/1200x/fd/8f/cb/fd8fcb213296ed6fe5960b3a78080a4c.jpg",
    },
    {
      id: "post-4",
      title: "Classic Gold Bracelet",
      subtitle: "polished finish | signature piece",
      category: "bracelets",
      price: "$310",
      img: "https://i.pinimg.com/1200x/97/43/7f/97437fa1ce87cc223e9255cc9d2b9255.jpg",
    },
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-[#1A080B] tracking-wide mb-2">
          Our Fine Jewelry
        </h2>
        <p className="text-xs tracking-widest text-[#1A080B]/50 uppercase">
          Handcrafted Timeless Pieces
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col w-[340px] group cursor-pointer bg-white"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F9F9F9] mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(post.id);
                }}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full 
                bg-white shadow-sm flex items-center justify-center 
                text-[#1A080B] hover:scale-105 transition duration-200"
              >
                {favorites.includes(post.id) ? (
                  <span className="text-red-500">♥</span>
                ) : (
                  <span className="text-[#1A080B]/40 hover:text-[#1A080B]">♡</span>
                )}
              </button>

              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
              />

              <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm py-2.5 text-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-[11px] tracking-widest uppercase font-medium text-[#1A080B]">
                  Quick View
                </span>
              </div>
            </div>

            <div className="flex flex-col text-center px-1">
              <span className="text-[9px] tracking-widest uppercase text-[#1A080B]/40 mb-1">
                {post.category}
              </span>
              
              <h3 className="font-serif text-[15px] text-[#1A080B] group-hover:underline decoration-1 underline-offset-4 transition">
                {post.title}
              </h3>
              
              <p className="text-[11px] text-[#1A080B]/50 italic mt-0.5 font-light">
                {post.subtitle}
              </p>

              <span className="text-sm font-medium text-[#1A080B] mt-2">
                {post.price || "$250"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}