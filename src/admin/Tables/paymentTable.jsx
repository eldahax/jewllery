import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

const STATUS_STYLES = {
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    refunded: "bg-stone-100 text-stone-600 border-stone-200",
};

export default function PaymentsTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const getOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/orders", {
                credentials: "include",
            });
            const data = await res.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const filtered = useMemo(() => {
        return orders.filter((o) => {
            const matchesStatus = statusFilter === "all" || o.status === statusFilter;
            const name = `${o.User?.first_name || ""} ${o.User?.last_name || ""}`.toLowerCase();
            const email = (o.customer_email || o.User?.email || "").toLowerCase();
            const matchesSearch =
                name.includes(searchTerm.toLowerCase()) ||
                email.includes(searchTerm.toLowerCase()) ||
                String(o.order_id).includes(searchTerm);
            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, searchTerm]);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, currentPage]);

    const totalRevenue = useMemo(() => {
        return orders
            .filter((o) => o.status === "paid")
            .reduce((acc, o) => acc + Number(o.total || 0), 0);
    }, [orders]);

    const paidCount = orders.filter((o) => o.status === "paid").length;
    const pendingCount = orders.filter((o) => o.status === "pending").length;

    return (
        <>
            <NavBar />
            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />

                <main className="flex-1 p-12">
                    <header className="mb-10 flex justify-between items-center border-b border-[#1A080B]/10 pb-8">
                        <div>
                            <h2 className="text-3xl font-serif">Payments</h2>
                            <p className="mt-2 text-sm opacity-60">
                                Stripe checkout orders from the storefront
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        <div className="bg-white border border-[#1A080B]/10 rounded-lg p-6">
                            <p className="uppercase text-[10px] tracking-widest opacity-50 mb-2">
                                Total Revenue (Paid)
                            </p>
                            <p className="text-2xl font-serif">€{totalRevenue.toFixed(2)}</p>
                        </div>
                        <div className="bg-white border border-[#1A080B]/10 rounded-lg p-6">
                            <p className="uppercase text-[10px] tracking-widest opacity-50 mb-2">
                                Paid Orders
                            </p>
                            <p className="text-2xl font-serif">{paidCount}</p>
                        </div>
                        <div className="bg-white border border-[#1A080B]/10 rounded-lg p-6">
                            <p className="uppercase text-[10px] tracking-widest opacity-50 mb-2">
                                Pending
                            </p>
                            <p className="text-2xl font-serif">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="mb-6 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by customer, email, or order #..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-[#1A080B]/20 px-4 py-2 w-80 rounded outline-none"
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-[#1A080B]/20 px-4 py-2 rounded outline-none"
                        >
                            <option value="all">All statuses</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>

                    {loading ? (
                        <p className="opacity-50 text-sm">Loading orders...</p>
                    ) : (
                        <>
                            <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F5F3EE] uppercase text-[14px] text-[#1A080B]/60">
                                        <tr>
                                            <th className="p-6">Order</th>
                                            <th className="p-6">Customer</th>
                                            <th className="p-6">Date</th>
                                            <th className="p-6">Total</th>
                                            <th className="p-6">Status</th>
                                            <th className="p-6 text-right">Details</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#1A080B]/5">
                                        {paginated.map((order) => (
                                            <React.Fragment key={order.order_id}>
                                                <tr className="hover:bg-[#FCFBF9]">
                                                    <td className="p-6 font-medium">#{order.order_id}</td>
                                                    <td className="p-6 opacity-70">
                                                        {order.User
                                                            ? `${order.User.first_name || ""} ${order.User.last_name || ""}`.trim()
                                                            : "—"}
                                                        <div className="text-xs opacity-50">
                                                            {order.customer_email || order.User?.email}
                                                        </div>
                                                    </td>
                                                    <td className="p-6 opacity-70">
                                                        {order.created_at
                                                            ? new Date(order.created_at).toLocaleDateString()
                                                            : "—"}
                                                    </td>
                                                    <td className="p-6 font-medium">
                                                        €{Number(order.total).toFixed(2)}
                                                    </td>
                                                    <td className="p-6">
                                                        <span
                                                            className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border ${
                                                                STATUS_STYLES[order.status] ||
                                                                "bg-stone-100 text-stone-600 border-stone-200"
                                                            }`}
                                                        >
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-6 text-right">
                                                        <button
                                                            onClick={() =>
                                                                setExpandedId(
                                                                    expandedId === order.order_id ? null : order.order_id
                                                                )
                                                            }
                                                            className="text-[#D4AF37] uppercase text-[10px] hover:underline"
                                                        >
                                                            {expandedId === order.order_id ? "Hide" : "View items"}
                                                        </button>
                                                    </td>
                                                </tr>

                                                {expandedId === order.order_id && (
                                                    <tr>
                                                        <td colSpan={6} className="p-6 bg-[#FCFBF9]">
                                                            <div className="space-y-3">
                                                                {order.OrderItems?.map((item) => (
                                                                    <div
                                                                        key={item.order_item_id}
                                                                        className="flex justify-between text-sm"
                                                                    >
                                                                        <span>
                                                                            {item.Product?.product_name || "Product"} × {item.quantity}
                                                                        </span>
                                                                        <span className="opacity-60">
                                                                            €{(item.price_at_purchase * item.quantity).toFixed(2)}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                               
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}

                                        {paginated.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="p-12 text-center opacity-50">
                                                    No orders match your filters.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="border px-4 py-2 disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {currentPage} of{" "}
                                    {Math.max(1, Math.ceil(filtered.length / itemsPerPage))}
                                </span>

                                <button
                                    disabled={currentPage >= Math.ceil(filtered.length / itemsPerPage)}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="border px-4 py-2 disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
