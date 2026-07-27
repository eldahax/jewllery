import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function JewelryGrid({ selectedFilter, setSelectedFilter }) {


    const [posts, setPosts] = useState([]);

    const [favorites, setFavorites] = useState([]);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("all");


    const navigate = useNavigate();



    useEffect(() => {


        const fetchProducts = async () => {


            try {


                const res = await fetch(
                    "http://localhost:5000/api/products",
                    {
                        credentials: "include"
                    }
                );


                const data = await res.json();


                setPosts(
                    Array.isArray(data)
                        ?
                        data
                        :
                        []
                );



            } catch (err) {

                console.log(err);

            }


        };


        fetchProducts();


    }, []);





    const toggleFav = async (id) => {


        setFavorites(prev =>

            prev.includes(id)

                ?

                prev.filter(x => x !== id)

                :

                [...prev, id]

        );


        try {

            await fetch(

                "http://localhost:5000/api/favorites/toggle",

                {

                    method: "POST",

                    credentials: "include",

                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({ product_id: id })

                }

            );

        } catch (err) {

            console.log(err);

        }


    };



    const getActiveDiscount = (post) => {

        if (!post.Discounts || post.Discounts.length === 0) return null;

        const now = new Date();

        return post.Discounts.find((d) => {

            if (!d.is_active) return false;

            const afterStart = !d.start_date || new Date(d.start_date) <= now;
            const beforeEnd = !d.end_date || new Date(d.end_date) >= now;

            return afterStart && beforeEnd;

        }) || null;

    };



    const getDiscountedPrice = (post, discount) => {

        if (!discount) return null;

        const price = Number(post.price);

        if (discount.discount_percentage) {
            return (price - (price * Number(discount.discount_percentage)) / 100).toFixed(2);
        }

        if (discount.discount_amount) {
            return Math.max(0, price - Number(discount.discount_amount)).toFixed(2);
        }

        return null;

    };





    const filteredPosts = posts.filter(post => {


        const matchesSearch =

            post.product_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                );



        const matchesCategory =

            category === "all"

            ||

            post.category
                ?.toLowerCase()
            === category;



        return matchesSearch && matchesCategory;



    });





    return (

        <section className="
w-full
mx-auto
px-6
py-12
"
        >



            <div className="text-center mb-12">


                <h2 className="
font-serif
text-3xl
tracking-wide
">

                    Our Fine Jewelry

                </h2>



                <p className="
text-xs
tracking-widest
uppercase
opacity-50
">

                    Handcrafted Timeless Pieces

                </p>





                <input

                    type="text"

                    placeholder="Search jewelry..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="
mt-10
w-[350px]
border-b
border-[#1A080B]/30
bg-transparent
py-3
text-center
outline-none
"

                />




                <div className="
flex
justify-center
gap-8
mt-8
">


                    {
                        [
                            "all",
                            "rings",
                            "necklaces",
                            "earrings",
                            "bracelets",
                            "watches"

                        ].map(item => (


                            <button

                                key={item}

                                onClick={() => setCategory(item)}

                                className={`
text-xs
uppercase
tracking-widest

${category === item
                                        ?
                                        "text-[#1A080B] underline"
                                        :
                                        "text-[#1A080B]/40"
                                    }

`}

                            >

                                {item}

                            </button>


                        ))

                    }


                </div>



            </div>





            <div className="
flex
flex-wrap
justify-center
gap-x-6
gap-y-10
">


                {

                    filteredPosts.map(post => {

                        const activeDiscount = getActiveDiscount(post);
                        const discountedPrice = getDiscountedPrice(post, activeDiscount);

                        return (


                        <div

                            key={post.product_id}

                            onClick={() => navigate(
                                `/products/${post.product_id}`
                            )}

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


                                {

                                    activeDiscount

                                        &&

                                        <span className="
absolute
top-3
left-3
z-20
bg-[#1A080B]
text-white
text-[9px]
uppercase
tracking-widest
px-3
py-1
">

                                            Sale

                                        </span>

                                }



                                <button

                                    onClick={(e) => {

                                        e.stopPropagation();

                                        toggleFav(post.product_id);

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


                                    {

                                        favorites.includes(post.product_id)

                                            ?

                                            <span className="text-red-500">
                                                ♥
                                            </span>

                                            :

                                            <span>
                                                ♡
                                            </span>

                                    }



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




                                {

                                    discountedPrice

                                        ?

                                        <p className="text-sm mt-2">

                                            <span className="line-through opacity-40 mr-2">
                                                €{post.price}
                                            </span>

                                            <span className="text-[#1A080B] font-medium">
                                                €{discountedPrice}
                                            </span>

                                        </p>

                                        :

                                        <p className="
text-sm
mt-2
">

                                            €{post.price}

                                        </p>

                                }



                            </div>



                        </div>


                        );

                    })


                }



            </div>



        </section>

    );


}