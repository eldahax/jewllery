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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || post.category === category;

    return matchesSearch && matchesCategory;
  });


  return (
    <section className="w-full mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-[#1A080B] tracking-wide mb-2">
          Our Fine Jewelry
        </h2>
        <p className="text-xs tracking-widest text-[#1A080B]/50 uppercase">
          Handcrafted Timeless Pieces
        </p>

        <div className="mt-10">

          <input
            type="text"
            placeholder="Search jewelry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-[350px]
              border-b
              border-[#1A080B]/30
              bg-transparent
              py-3
              text-center
              font-serif
              outline-none
            "
          />

        </div>

        <div className="flex justify-center gap-8 mt-8">

          {[
            "all",
            "rings",
            "necklaces",
            "earrings",
            "bracelets",
            "watches",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
                text-xs uppercase tracking-widest
                ${category === item
                  ? "text-[#1A080B] underline"
                  : "text-[#1A080B]/40"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
        {filteredPosts.map((post) => (
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
                className="
                  absolute top-3 right-3 z-20
                  w-8 h-8 rounded-full
                  bg-white shadow-sm
                  flex items-center justify-center
                "
              >

                {favorites.includes(post.id)
                  ? <span className="text-red-500">♥</span>
                  : <span>♡</span>
                }

              </button>
              <img
                src={post.img}
                alt={post.title}
                className="
                  w-full h-full object-cover
                  group-hover:scale-105
                  transition duration-700
                "
              />

              <div className="
                  absolute bottom-0 inset-x-0   bg-white/80 backdrop-blur-sm
                  py-3 text-center
                  opacity-0
                  group-hover:opacity-100
                  transition       " >
                <span className="text-[11px] tracking-widest uppercase">
                  Quick View
                </span>
              </div>
            </div>

            <div className="text-center">

              <span className="text-[9px] tracking-widest uppercase text-[#1A080B]/40">
                {post.category}
              </span>
              <h3 className="font-serif text-[15px] mt-2">
                {post.title}
              </h3>
              <p className="text-[11px] italic text-[#1A080B]/50">
                {post.subtitle}
              </p>
              <p className="text-sm mt-2">
                {post.price}
              </p>

            </div>


          </div>

        ))}

      </div>


    </section>
  );
}