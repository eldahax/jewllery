import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

const STATUS_STYLES = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  refunded: "bg-slate-100 text-slate-600 border-slate-200",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status?.toLowerCase()] || "bg-stone-100 text-stone-600 border-stone-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium border ${style}`}>
      {status || "Unknown"}
    </span>
  );
}

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        credentials: "include",
        headers: authHeaders(),
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    getOrders(); 
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const customerName = `${o.User?.first_name || ""} ${o.User?.last_name || ""} ${o.User?.email || ""} ${o.order_id}`.toLowerCase();
      const matchesSearch = customerName.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || o.status?.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;

  const orderTotal = (order) => {
    if (order.total) return Number(order.total).toFixed(2);
    const items = order.OrderItems || [];
    return items.reduce((sum, item) => sum + Number(item.Product?.price || 0) * Number(item.quantity || 1), 0).toFixed(2);
  };

  const summary = useMemo(() => {
    const paid = orders.filter((o) => o.status?.toLowerCase() === "paid");
    const pending = orders.filter((o) => o.status?.toLowerCase() === "pending");
    const revenue = paid.reduce((sum, o) => sum + Number(orderTotal(o)), 0);
    return { revenue: revenue.toFixed(2), paidCount: paid.length, pendingCount: pending.length };
  }, [orders]);

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-[#FBFBFA] text-stone-800 font-sans">
        <Profile />
        <main className="flex-1 max-w-8xl mx-auto px-6 lg:px-10 py-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Orders</h1>
              <p className="text-sm text-stone-500 mt-0.5">Review recent store transactions and fulfillment details.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors shadow-sm w-60"
              />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-sm text-stone-700 focus:outline-none focus:border-stone-400 transition-colors shadow-sm cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs">
              <p className="text-xs font-medium text-stone-500">Total Revenue</p>
              <p className="text-xl font-semibold text-stone-900 mt-1">€{summary.revenue}</p>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs">
              <p className="text-xs font-medium text-stone-500">Paid Orders</p>
              <p className="text-xl font-semibold text-stone-900 mt-1">{summary.paidCount}</p>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs">
              <p className="text-xs font-medium text-stone-500">Pending Orders</p>
              <p className="text-xl font-semibold text-stone-900 mt-1">{summary.pendingCount}</p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-stone-400">Loading orders...</div>
          ) : (
            <>
              <div className="space-y-3">
                {paginatedOrders.map((o) => {
                  const isExpanded = expandedId === o.order_id;
                  return (
                    <div 
                      key={o.order_id} 
                      className="bg-white border border-stone-200/80 rounded-xl p-5 shadow-xs transition-all hover:border-stone-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 font-medium text-xs shrink-0">
                            #{o.order_id}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-stone-900 text-sm">
                                {o.User?.first_name || ""} {o.User?.last_name || "Guest Customer"}
                              </span>
                              <StatusBadge status={o.status} />
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                              {o.User?.email || "No email provided"} • {o.created_at ? new Date(o.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                          <div className="text-left sm:text-right">
                            <p className="text-xs text-stone-400">Total</p>
                            <p className="text-sm font-semibold text-stone-900">€{orderTotal(o)}</p>
                          </div>

                          <button
                            onClick={() => setExpandedId(isExpanded ? null : o.order_id)}
                            className="px-3 py-1.5 border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-lg text-xs font-medium transition-colors"
                          >
                            {isExpanded ? "Hide Details" : "View Items"}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-stone-100 space-y-2.5">
                          <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">Line Items</p>
                          {(o.OrderItems || []).map((item) => (
                            <div 
                              key={item.order_item_id || item.product_id}
                              className="flex items-center justify-between bg-stone-50/70 p-2.5 rounded-lg border border-stone-100 text-xs"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded bg-white border border-stone-200 overflow-hidden shrink-0">
                                  {item.Product?.image && (
                                    <img
                                      src={`http://localhost:5000/uploads/${item.Product.image}`}
                                      alt={item.Product?.product_name}
                                      className="w-full h-full object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-stone-800">{item.Product?.product_name || "Product Item"}</p>
                                  <p className="text-stone-500">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-medium text-stone-900">€{Number(item.Product?.price || 0).toFixed(2)}</span>
                            </div>
                          ))}
                          {(!o.OrderItems || o.OrderItems.length === 0) && (
                            <p className="text-xs text-stone-400 italic">No products registered for this order entry.</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {paginatedOrders.length === 0 && (
                  <div className="bg-white border border-stone-200/80 rounded-xl p-12 text-center text-stone-400 text-sm">
                    No matching orders found.
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-200/60 text-xs text-stone-500">
                  <span>Page {currentPage} of {totalPages}</span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-7 h-7 rounded-lg font-medium transition-colors flex items-center justify-center ${
                          currentPage === i + 1
                            ? "bg-stone-900 text-white"
                            : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}