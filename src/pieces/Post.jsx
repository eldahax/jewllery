import React, { useState } from "react";

export default function Post() {
  const editorialPosts = [
    {
      id: "post-1",
      title: "The Art of Layering Solid Gold Pieces",
      date: "OCTOBER 12",
      excerpt: "Discover the fundamental rules of stacking silhouettes for an elegant, timeless aesthetic.",
      category: "necklaces",
      img: "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg",
    },
    {
      id: "post-2",
      title: "Behind The Craft: Lost-Wax Casting Techniques",
      date: "SEPTEMBER 28",
      excerpt: "A pure visual journey inside our maison workspace detailing historical modeling steps.",
      category: "rings",
      img: "https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [favoritePosts, setFavoritePosts] = useState([]);

  const toggleFavoritePost = (id) => {
    setFavoritePosts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredPosts = editorialPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedFilter === "all" || post.category === selectedFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="w-[1200px] mt-4 mb-12 px-12 flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-[#1A080B]/10">
        <div className="relative w-[340px]">
          <input
            type="text"
            placeholder="Search journal entries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-b border-[#1A080B]/30 py-2 pl-2 pr-8 font-serif italic text-[14px] focus:outline-none focus:border-[#1A080B] transition-colors placeholder-[#1A080B]/40"
          />
          <span className="absolute right-2 top-2.5 text-[12px] opacity-40">🔍</span>
        </div>

        <div className="flex gap-6 text-[11px] tracking-[0.2em] uppercase font-sans text-[#1A080B]/60">
          {["all", "bracelets", "rings", "earrings", "necklaces"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`pb-1 transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "text-[#1A080B] border-b border-[#1A080B] font-medium"
                  : "hover:text-[#1A080B] border-b border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section id="maison-notes-section" className="w-[1200px] px-12 pb-[140px] flex flex-col items-center scroll-mt-6">
        <div className="w-full border-b border-[#1A080B]/10 pb-4 mb-12 flex justify-between items-end">
          <h2 className="font-serif text-[24px] tracking-wide font-light">Maison Notes</h2>
          <span className="font-sans text-[10px] tracking-widest uppercase opacity-40">
            {selectedFilter === "all" ? "Volume III" : `${selectedFilter}`}
          </span>
        </div>

        <div className="w-full flex flex-wrap justify-between gap-y-16">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="w-[530px] flex flex-col gap-6 group cursor-pointer relative">
                <div className="w-full h-[300px] overflow-hidden rounded-[2px] relative shadow-xs">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoritePost(post.id);
                    }}
                    className="absolute top-4 right-4 text-[20px] p-2 bg-white/20 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-transform active:scale-90 hover:bg-white/40 z-20 cursor-pointer"
                  >
                    {favoritePosts.includes(post.id) ? "❤️" : "🤍"}
                  </button>

                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[9px] tracking-[0.25em] text-[#1A080B]/40 font-medium">{post.date}</span>
                  <h3 className="font-serif text-[18px] tracking-wide text-[#1A080B] group-hover:text-[#5C4033] transition-colors">{post.title}</h3>
                  <p className="font-serif text-[13px] text-[#1A080B]/60 leading-relaxed max-w-[480px]">{post.excerpt}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="font-serif italic text-[#1A080B]/40 text-[14px] py-8 mx-auto">
              No journal logs match your configuration.
            </p>
          )}
        </div>
      </section>
    </>
  );
}