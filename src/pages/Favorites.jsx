import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/nav";

export default function Favorites() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {

    const fetchFavorites = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/favorites",
          { credentials: "include" }
        );

        const data = await res.json();

        setFavorites(
          Array.isArray(data)
          ?
          data
          :
          []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchFavorites();

  }, []);


  const removeFavorite = async (product_id) => {

    setFavorites(prev =>
      prev.filter(fav => fav.product_id !== product_id)
    );

    try {

      await fetch(
        "http://localhost:5000/api/favorites/toggle",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id })
        }
      );

    } catch (err) {

      console.log(err);

    }

  };


  return (

    <div>

      <NavBar/>

      <div className="
      w-full
      min-h-screen
      bg-[#FCFBF9]
      text-[#1A080B]
      antialiased
      flex
      flex-col
      items-center
      select-none
      ">

        <section className="
        w-full
        mx-auto
        px-6
        py-12
        ">

          <div className="text-center mb-12">

            <h2 className="
            font-serif
            text-3xl
            tracking-wide
            ">

              My Favorites

            </h2>

            <p className="
            text-xs
            tracking-widest
            uppercase
            opacity-50
            ">

              Pieces You've Saved

            </p>

          </div>


          {

          loading

          ?

          <p className="
          text-center
          text-xs
          tracking-widest
          uppercase
          opacity-50
          ">

            Loading favorites...

          </p>

          :

          favorites.length === 0

          ?

          <div className="text-center">

            <p className="
            text-sm
            opacity-50
            mb-6
            ">

              You haven't saved any pieces yet.

            </p>

            <button

              onClick={() => navigate("/shop")}

              className="
              text-xs
              uppercase
              tracking-widest
              border-b
              border-[#1A080B]/40
              pb-1
              hover:border-[#1A080B]
              transition
              "

            >

              Browse The Collection

            </button>

          </div>

          :

          <div className="
          flex
          flex-wrap
          justify-center
          gap-x-6
          gap-y-10
          ">

            {

            favorites.map(fav => {

              const post = fav.Product || fav;

              return (

                <div

                  key={fav.favorite_id || post.product_id}

                  onClick={() => navigate(`/products/${post.product_id}`)}

                  className="
                  flex
                  flex-col
                  w-[340px]
                  group
                  cursor-pointer
                  bg-white
                  "

                >

                  <div className="
                  relative
                  w-full
                  aspect-[3/4]
                  overflow-hidden
                  bg-[#F9F9F9]
                  mb-4
                  ">

                    <button

                      onClick={(e) => {

                        e.stopPropagation();

                        removeFavorite(post.product_id);

                      }}

                      className="
                      absolute
                      top-3
                      right-3
                      z-20
                      w-8
                      h-8
                      rounded-full
                      bg-white
                      shadow-sm
                      "

                    >

                      <span className="text-red-500">
                        ♥
                      </span>

                    </button>


                    <img

                      src={`http://localhost:5000/uploads/${post.image}`}

                      alt={post.product_name}

                      className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-700
                      "

                    />


                    <div className="
                    absolute
                    bottom-0
                    inset-x-0
                    bg-white/80
                    backdrop-blur-sm
                    py-3
                    text-center
                    opacity-0
                    group-hover:opacity-100
                    transition
                    ">

                      <span className="
                      text-[11px]
                      tracking-widest
                      uppercase
                      ">

                        Quick View

                      </span>

                    </div>

                  </div>


                  <div className="text-center">

                    <span className="
                    text-[9px]
                    tracking-widest
                    uppercase
                    opacity-40
                    ">

                      {post.category || "gold"}

                    </span>

                    <h3 className="
                    font-serif
                    text-[15px]
                    mt-2
                    ">

                      {post.product_name}

                    </h3>

                    <p className="
                    text-[11px]
                    italic
                    opacity-50
                    ">

                      {post.brand}

                    </p>

                    <p className="
                    text-sm
                    mt-2
                    ">

                      €{post.price}

                    </p>

                  </div>

                </div>

              );

            })

            }

          </div>

          }

        </section>

      </div>

    </div>

  );

}
