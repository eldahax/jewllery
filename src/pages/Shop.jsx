import React, { useState } from "react";
import NavBar from "../components/nav";
import ShopHero from "../pieces/shopHero";
import Catalog from "../pieces/shopCatalog";
import PremiumCollection from "../pieces/Collection";
import Post from "../pieces/Post";

export default function Shop() {
  const categoriesData = [
    { name: "BRACELETS", img: "https://i.pinimg.com/236x/ec/d7/20/ecd72061327fcd7daeb254641e4c76b5.jpg", arched: false, type: "bracelets" },
    { name: "RINGS", img: "https://i.pinimg.com/1200x/a4/75/89/a47589f4173b03d72d63f7bf265484de.jpg", arched: true, type: "rings" },
    { name: "EARRINGS", img: "https://i.pinimg.com/webp/1200x/ca/94/90/ca9490bada48c083b3ac4338f46dee09.webp", arched: true, type: "earrings" },
    { name: "NECKLACES", img: "https://i.pinimg.com/736x/95/f6/5e/95f65e07c423781a08328dfac5639446.jpg", arched: true, type: "necklaces" },
    { name: "WATCHES", img: "https://i.pinimg.com/736x/10/96/3e/10963e324d596898b478842f665f4384.jpg", arched: false, type: "watches" },
    { name: "ACCESSORIES", img: "https://i.pinimg.com/736x/40/c9/b3/40c9b3a3b0c40ed4d9daee0876992476.jpg", arched: false, type: "accessories" },
  ];

  const premiumCollectiond = [
    {
      id: "dy-1",
      name: "DY Mercer™ 18-karat gold diamond necklace",
      price: "€37,400",
      category: "necklaces",
      img: "https://i.pinimg.com/736x/7c/81/b9/7c81b9af9918eb467f37ff2ee8999f85.jpg",
    },
    {
      id: "dy-2",
      name: "DY Mercer 18-karat gold diamond hoop earrings",
      price: "€6,550",
      category: "earrings",
      img: "https://i.pinimg.com/736x/10/96/3e/10963e324d596898b478842f665f4384.jpg",
    },
    {
      id: "dy-3",
      name: "Pavéflex 18-karat yellow, white and rose gold diamond bracelet",
      price: "€21,150",
      category: "bracelets",
      img: "https://i.pinimg.com/1200x/e6/3d/c5/e63dc5566c205ad683cc8396c091f118.jpg",
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleCategoryClick = (categoryType) => {
    setSelectedFilter(categoryType);
    const postsSection = document.getElementById("maison-notes-section");
    if (postsSection) {
      postsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div> 
      <NavBar />
      <div className="w-full bg-[#FCFBF9] text-[#1A080B] antialiased flex flex-col items-center select-none">
        <ShopHero/>
    
        <Catalog 
          categories={categoriesData} 
          onCategoryClick={handleCategoryClick}  
        />

        <PremiumCollection premiumCollection={premiumCollectiond}/>
        
        <Post 
          selectedFilter={selectedFilter} 
          setSelectedFilter={setSelectedFilter} 
        />
      </div>
    </div>
  );
}