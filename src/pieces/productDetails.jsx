import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/nav";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [favorite, setFavorite] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [stars, setStars] = useState(0);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/cart/add", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
                body: JSON.stringify({ product_id: id, quantity })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add to cart");
            }

            alert("Product added to your private cart successfully!");
        } catch (err) {
            console.error(err);
            alert(err.message || "Could not add to cart. Please ensure you are logged in.");
        }
    };

    const handleReview = async () => {
        if (stars === 0) {
            alert("Please select a rating!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/reviews", {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
                body: JSON.stringify({ product_id: id, stars, notes: reviewText })
            });

            if (!res.ok) throw new Error("Could not create review");

            alert("Review submitted successfully!");
            setReviewText("");
            setStars(0);
        } catch (err) {
            console.error(err);
            alert("Failed to submit review.");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`, { credentials: "include" });
                const data = await res.json();
                setProduct(data);
            } catch (err) { console.log(err); }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="p-20 text-center">Loading product...</div>;

    return (
        <>
            <NavBar />
            <main className="bg-[#FCFBF9] text-[#1A080B] min-h-screen px-10 py-16">
                <section className="max-w-7xl mx-auto grid grid-cols-2 gap-16">
                    <div>
                        <div className="bg-white overflow-hidden">
                            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.product_name} className="w-full h-[700px] object-cover hover:scale-105 transition duration-700" />
                        </div>
                        <div className="flex gap-4 mt-5">
                            <div className="w-24 h-24 bg-white border"><img src={`http://localhost:5000/uploads/${product.image}`} className="w-full h-full object-cover" /></div>
                            <div className="w-24 h-24 bg-white border"><img src={`http://localhost:5000/uploads/${product.image}`} className="w-full h-full object-cover" /></div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="uppercase tracking-[4px] text-xs opacity-50">{product.brand || "Celeste Gold"}</p>
                        <h1 className="font-serif text-5xl mt-5 leading-tight">{product.product_name}</h1>
                        <div className="flex items-center gap-3 mt-6"><span className="text-[#D4AF37]">★★★★★</span><span className="text-sm opacity-60">24 Reviews</span></div>
                        <p className="text-2xl mt-8">€{product.price}</p>
                        <div className="border-t border-b py-6 mt-8 space-y-3 text-sm">
                            <p>✓ In stock</p><p>✓ Free luxury packaging</p><p>✓ Certificate of authenticity</p>
                        </div>
                        <p className="mt-8 leading-relaxed opacity-70">{product.description || "A timeless handcrafted piece..."}</p>
                        <div className="flex items-center gap-5 mt-10">
                            <div className="flex border">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3">-</button>
                                <span className="px-5 py-3">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-3">+</button>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={handleAddToCart} className="flex-1 bg-[#1A080B] text-white py-5 uppercase tracking-widest text-xs">Add To Cart</button>
                            <button onClick={() => setFavorite(!favorite)} className="border px-8">{favorite ? "♥" : "♡"}</button>
                        </div>
                    </div>
                </section>

                <section className="max-w-5xl mx-auto mt-24">
                    <div className="bg-white border p-10 shadow-sm">
                        <h3 className="font-serif text-3xl mb-8">Leave a Review</h3>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs uppercase tracking-widest opacity-50">Rating</p>
                                <div className="flex gap-2 text-3xl text-[#D4AF37] cursor-pointer">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setStars(star)}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            {star <= stars ? "★" : "☆"}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-xs uppercase tracking-widest opacity-50">Your Review</p>
                                <textarea
                                    className="w-full border p-4 focus:ring-1 focus:ring-[#1A080B] outline-none transition-all"
                                    rows="4"
                                    placeholder="Tell us what you think about this piece..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleReview}
                                    className="bg-[#1A080B] text-white px-12 py-4 uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}