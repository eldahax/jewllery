import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NavBar from "../components/nav";

export default function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setError("Missing session information.");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/orders/session/${sessionId}`,
                    { credentials: "include" }
                );

                if (!res.ok) throw new Error("Order not found yet");
                const data = await res.json();
                setOrder(data);
            } catch (err) {
                console.error(err);
                setError(
                    "We couldn't find your order yet — it may take a few seconds to confirm. Refresh in a moment."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [sessionId]);

    return (
        <>
            <NavBar />
            <main className="bg-[#FCFBF9] text-[#1A080B] min-h-screen px-6 lg:px-16 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    {loading ? (
                        <p className="font-serif tracking-widest text-sm uppercase opacity-50 animate-pulse">
                            Confirming your order...
                        </p>
                    ) : error ? (
                        <div className="bg-white border border-stone-200/60 shadow-sm p-12">
                            <p className="font-serif text-2xl mb-4">Almost there</p>
                            <p className="text-sm opacity-60 mb-8">{error}</p>
                            <Link
                                to="/shop"
                                className="inline-block bg-[#1A080B] text-white px-10 py-4 uppercase tracking-widest text-xs"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white border border-stone-200/60 shadow-sm p-12 text-left">
                            <p className="uppercase tracking-[4px] text-xs opacity-50 mb-2 text-center">
                                Payment Confirmed
                            </p>
                            <h1 className="font-serif text-3xl lg:text-4xl mb-8 text-center">
                                Thank you for your order
                            </h1>

                            <div className="space-y-4 mb-8">
                                {order.OrderItems?.map((item) => (
                                    <div
                                        key={item.order_item_id}
                                        className="flex justify-between items-center border-b border-stone-100 pb-4"
                                    >
                                        <div>
                                            <p className="font-serif">{item.Product?.product_name}</p>
                                            <p className="text-xs opacity-50">Qty: {item.quantity}</p>
                                        </div>
                                        <p>€{(item.price_at_purchase * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between text-lg font-serif border-t pt-4 mb-8">
                                <span>Total</span>
                                <span>€{Number(order.total).toFixed(2)}</span>
                            </div>

                            <p className="text-xs opacity-50 text-center mb-8">
                                Order #{order.order_id} &middot; Status: {order.status}
                            </p>

                            <div className="text-center">
                                <Link
                                    to="/shop"
                                    className="inline-block bg-[#1A080B] text-white px-10 py-4 uppercase tracking-widest text-xs"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
