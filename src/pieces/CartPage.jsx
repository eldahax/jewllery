import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/nav";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkingOut, setCheckingOut] = useState(false);

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cart", { credentials: "include" });
            const data = await res.json();
            setCartItems(data);
        } catch (err) {
            console.error("Failed to load cart", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (cartItemId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!res.ok) throw new Error("Failed to remove item");
            setCartItems(cartItems.filter(item => item.cart_item_id !== cartItemId));
        } catch (err) {
            console.error(err);
            alert("Could not remove item.");
        }
    };

    const handleCheckout = async () => {
        try {
            setCheckingOut(true);
            const res = await fetch("http://localhost:5000/api/cart/create-checkout-session", {
                method: "POST",
                credentials: "include"
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Checkout failed");
                setCheckingOut(false);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to initiate checkout.");
            setCheckingOut(false);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.Product?.price || 0) * item.quantity), 0);
    const shipping = subtotal > 0 ? 0 : 0; // Free luxury shipping

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="bg-[#FCFBF9] min-h-screen flex items-center justify-center">
                    <p className="font-serif tracking-widest text-sm uppercase opacity-50 animate-pulse">Loading your selection...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />
            <main className="bg-[#FCFBF9] text-[#1A080B] min-h-screen px-6 lg:px-16 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="border-b pb-6 mb-12 flex justify-between items-end">
                        <div>
                            <p className="uppercase tracking-[4px] text-xs opacity-50 mb-2">Secure Checkout</p>
                            <h1 className="font-serif text-4xl lg:text-5xl">Your Shopping Bag</h1>
                        </div>
                        <span className="text-sm opacity-60">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-24 bg-white border border-stone-200/60 shadow-sm p-12">
                            <p className="font-serif text-2xl mb-4 opacity-80">Your bag is currently empty.</p>
                            <p className="text-sm opacity-50 mb-8">Discover our timeless handcrafted pieces and elevate your collection.</p>
                            <Link 
                                to="/shop" 
                                className="inline-block bg-[#1A080B] text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all"
                            >
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Items List */}
                            <div className="lg:col-span-7 space-y-6">
                                {cartItems.map((item) => (
                                    <div key={item.cart_item_id} className="flex gap-6 bg-white p-6 border border-stone-200/60 shadow-sm items-center transition hover:border-stone-400">
                                        <img 
                                            src={`http://localhost:5000/uploads/${item.Product?.image}`} 
                                            alt={item.Product?.product_name} 
                                            className="w-28 h-28 object-cover bg-stone-50" 
                                        />
                                        <div className="flex-1">
                                            <p className="uppercase tracking-widest text-[10px] opacity-40 mb-1">{item.Product?.brand || "Celeste Gold"}</p>
                                            <h3 className="font-serif text-xl mb-1">{item.Product?.product_name}</h3>
                                            <div className="flex items-center gap-6 text-sm opacity-60 mt-2">
                                                <span>Quantity: <strong className="text-[#1A080B]">{item.quantity}</strong></span>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col justify-between h-full items-end gap-6">
                                            <p className="font-serif text-lg">€{(item.Product?.price * item.quantity).toFixed(2)}</p>
                                            <button 
                                                onClick={() => handleRemove(item.cart_item_id)} 
                                                className="text-xs tracking-wider uppercase opacity-40 hover:opacity-100 hover:text-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Box */}
                            <div className="lg:col-span-5 bg-white p-8 border border-stone-200/60 shadow-sm space-y-6 sticky top-24">
                                <h3 className="font-serif text-2xl border-b pb-4">Order Summary</h3>
                                
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="opacity-70">Subtotal</span>
                                        <span className="font-medium">€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-70">Luxury Shipping</span>
                                        <span className="text-emerald-700 font-medium uppercase tracking-wider text-xs">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-4 text-lg font-serif">
                                        <span>Total</span>
                                        <span>€{subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-[#FCFBF9] p-4 border border-stone-200 text-xs space-y-2 opacity-70">
                                    <p>✓ Secure Stripe End-to-End Encryption</p>
                                    <p>✓ Certificate of authenticity included</p>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={checkingOut}
                                    className="w-full bg-[#1A080B] text-white py-5 uppercase tracking-widest text-xs hover:bg-opacity-90 transition-all disabled:opacity-50"
                                >
                                    {checkingOut ? "Redirecting to Stripe..." : "Proceed to Secure Checkout"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}