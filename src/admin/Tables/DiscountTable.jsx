import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function DiscountTable() {
  const [discounts, setDiscounts] = useState([]);
  const [view, setView] = useState("table");
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getDiscounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/discounts", { credentials: "include" });
      const data = await res.json();
      setDiscounts(data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => { getDiscounts(); }, []);

  const filteredDiscounts = useMemo(() => {
    return discounts.filter((d) =>
      `${d.Product?.product_name || ""} ${d.Product?.sku || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [discounts, searchTerm]);

  const paginatedDiscounts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDiscounts.slice(start, start + itemsPerPage);
  }, [filteredDiscounts, currentPage]);

  const totalPages = Math.ceil(filteredDiscounts.length / itemsPerPage);

  const handleDelete = async(id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/discounts/${id}`, { method: "DELETE", credentials: "include" });
      if(res.ok) { getDiscounts(); }
    } catch(err) { console.error(err); }
  };

  const getDiscountStatus = (d) => {
    if (!d.is_active) return "Inactive";
    const now = new Date();
    if (d.start_date && new Date(d.start_date) > now) return "Scheduled";
    if (d.end_date && new Date(d.end_date) < now) return "Expired";
    return "Active";
  };

  const getDiscountedPrice = (d) => {
    if (!d.Product?.price) return null;
    const price = Number(d.Product.price);
    if (d.discount_percentage) {
      return (price - (price * Number(d.discount_percentage)) / 100).toFixed(2);
    }
    if (d.discount_amount) {
      return Math.max(0, price - Number(d.discount_amount)).toFixed(2);
    }
    return null;
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
        <Profile />
        <main className="flex-1 p-12">
          <header className="mb-10 border-b border-[#1A080B]/10 pb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-serif">Discounts</h2>
              <div className="flex gap-4">
                <input
                  placeholder="Search..."
                  className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none"
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
                <button
                  onClick={() => { setEditingDiscount(null); setView("add"); }}
                  className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest"
                >
                  + Add Discount
                </button>
              </div>
            </div>
          </header>
          {
            view === "edit" || view === "add"
            ? <DiscountForm
                mode={view}
                discount={editingDiscount}
                onCancel={() => { setView("table"); setEditingDiscount(null); }}
                onSuccess={() => { getDiscounts(); setView("table"); setEditingDiscount(null); }}
              />
            : <>
                <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F5F3EE] uppercase text-[10px] tracking-widest text-[#1A080B]/60">
                      <tr>
                        <th className="p-4">Image</th>
                        <th className="p-4">Product</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Discount</th>
                        <th className="p-4">Discounted Price</th>
                        <th className="p-4">Start Date</th>
                        <th className="p-4">End Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A080B]/5">
                      {
                        paginatedDiscounts.map((d) => {
                          const status = getDiscountStatus(d);
                          const discountedPrice = getDiscountedPrice(d);
                          return (
                          <tr key={d.discount_id}>
                            <td className="p-4">
                              {d.Product?.image ? (
                                <img
                                  src={`http://localhost:5000/uploads/${d.Product.image}`}
                                  alt={d.Product?.product_name}
                                  className="w-12 h-12 object-cover rounded bg-[#F5F3EE]"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded bg-[#F5F3EE]" />
                              )}
                            </td>
                            <td className="p-4 text-xs font-medium">{d.Product?.product_name || "-"}</td>
                            <td className="p-4 text-xs">{d.Product?.sku || "-"}</td>
                            <td className="p-4 text-xs">{d.Product?.price ? `$${d.Product.price}` : "-"}</td>
                            <td className="p-4 text-xs">
                              {d.discount_percentage
                                ? `${d.discount_percentage}%`
                                : d.discount_amount
                                ? `$${d.discount_amount}`
                                : "-"}
                            </td>
                            <td className="p-4 text-xs text-[#D4AF37] font-medium">
                              {discountedPrice ? `$${discountedPrice}` : "-"}
                            </td>
                            <td className="p-4 text-xs">{d.start_date ? d.start_date.slice(0, 10) : "-"}</td>
                            <td className="p-4 text-xs">{d.end_date ? d.end_date.slice(0, 10) : "-"}</td>
                            <td className="p-4 text-xs">
                              <span className={`px-2 py-1 text-[9px] uppercase tracking-widest ${
                                status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : status === "Scheduled"
                                  ? "bg-[#F5F3EE] text-[#1A080B]/60"
                                  : status === "Expired"
                                  ? "bg-[#F5F3EE] text-[#1A080B]/40"
                                  : "bg-red-50 text-red-400"
                              }`}>
                                {status}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-4">
                              <button
                                onClick={() => { setEditingDiscount(d); setView("edit"); }}
                                className="text-[#D4AF37] uppercase text-[9px]"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(d.discount_id)}
                                className="text-red-400 uppercase text-[9px]"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-2 mt-6">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 border text-[10px] uppercase ${currentPage === i + 1 ? "bg-[#1A080B] text-white" : "border-[#1A080B]/10"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
          }
        </main>
      </div>
    </>
  );
}

function DiscountForm({ mode, discount, onCancel, onSuccess }) {
  const [data, setData] = useState({
    product_id: "",
    discount_percentage: "",
    discount_amount: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    if(discount) {
      setData({
        product_id: discount.product_id || "",
        discount_percentage: discount.discount_percentage || "",
        discount_amount: discount.discount_amount || "",
        start_date: discount.start_date ? discount.start_date.slice(0, 10) : "",
        end_date: discount.end_date ? discount.end_date.slice(0, 10) : "",
        is_active: discount.is_active !== undefined ? discount.is_active : true,
      });
    }
  }, [discount]);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        const res = await fetch("http://localhost:5000/api/products", { credentials: "include" });
        setProducts(await res.json());
      } catch(err) { console.error(err); }
    };
    fetchProducts();
  }, []);

  const validate = () => {
    const newErrors = {};
    const numberRegex = /^\d+(\.\d{1,2})?$/;

    if (!data.product_id) {
      newErrors.product_id = "Please select a product.";
    }
    if (!data.discount_percentage && !data.discount_amount) {
      newErrors.discount_percentage = "Enter a percentage or a flat amount.";
    }
    if (data.discount_percentage && data.discount_amount) {
      newErrors.discount_percentage = "Use either percentage or amount, not both.";
    }
    if (data.discount_percentage && (!numberRegex.test(data.discount_percentage) || Number(data.discount_percentage) <= 0 || Number(data.discount_percentage) > 100)) {
      newErrors.discount_percentage = "Percentage must be between 1 and 100.";
    }
    if (data.discount_amount && (!numberRegex.test(data.discount_amount) || Number(data.discount_amount) <= 0)) {
      newErrors.discount_amount = "Amount must be a valid positive number.";
    }
    if (data.start_date && data.end_date && data.start_date > data.end_date) {
      newErrors.end_date = "End date must be after start date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (!validate()) return;

    const payload = {
      product_id: data.product_id,
      discount_percentage: data.discount_percentage || null,
      discount_amount: data.discount_amount || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      is_active: data.is_active,
    };

    const url = mode === "edit" ? `http://localhost:5000/api/discounts/${discount.discount_id}` : "http://localhost:5000/api/discounts";
    try {
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });
      if(res.ok) {
        const result = await res.json();
        onSuccess(result);
      }
    } catch(err) { console.error(err); }
  };

  return (
    <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10 shadow-sm">
      <h3 className="text-xl font-serif mb-6">{mode === "edit" ? "Edit Discount" : "Add New Discount"}</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 relative">
          <button
            type="button"
            onClick={() => setProductDropdownOpen((v) => !v)}
            className="w-full border-b py-2 outline-none flex items-center gap-3 text-left"
          >
            {(() => {
              const selected = products.find(p => String(p.product_id) === String(data.product_id));
              if (!selected) {
                return <span className="text-[#1A080B]/40 text-sm">Select Product</span>;
              }
              return (
                <>
                  {selected.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${selected.image}`}
                      alt={selected.product_name}
                      className="w-20 h-20 object-cover rounded bg-[#F5F3EE]"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded bg-[#F5F3EE]" />
                  )}
                  <span className="text-sm">{selected.product_name}</span>
                </>
              );
            })()}
          </button>

          {productDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-[#1A080B]/10 shadow-lg">
              {products.map(p => (
                <button
                  type="button"
                  key={p.product_id}
                  onClick={() => { setData({ ...data, product_id: p.product_id }); setProductDropdownOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#F5F3EE] text-left"
                >
                  {p.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.product_name}
                      className="w-20 h-20 object-cover rounded bg-[#F5F3EE]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-[#F5F3EE]" />
                  )}
                  <span className="flex-1 text-xs">{p.product_name}</span>
                  <span className="text-[10px] text-[#1A080B]/40">${p.price}</span>
                </button>
              ))}
            </div>
          )}
          {errors.product_id && <p className="text-red-500 text-xs mt-1">{errors.product_id}</p>}
        </div>
        <div>
          <input
            className="w-full border-b py-2 outline-none"
            type="number"
            value={data.discount_percentage}
            onChange={(e) => setData({ ...data, discount_percentage: e.target.value, discount_amount: "" })}
            placeholder="Discount %"
          />
          {errors.discount_percentage && <p className="text-red-500 text-xs mt-1">{errors.discount_percentage}</p>}
        </div>
        <div>
          <input
            className="w-full border-b py-2 outline-none"
            type="number"
            value={data.discount_amount}
            onChange={(e) => setData({ ...data, discount_amount: e.target.value, discount_percentage: "" })}
            placeholder="Amount off ($)"
          />
          {errors.discount_amount && <p className="text-red-500 text-xs mt-1">{errors.discount_amount}</p>}
        </div>
        <div>
          <label className="text-[10px] uppercase text-[#1A080B]/50">Start Date</label>
          <input
            className="w-full border-b py-2 outline-none"
            type="date"
            value={data.start_date}
            onChange={(e) => setData({ ...data, start_date: e.target.value })}
          />
        </div>
        <div>
          <label className="text-[10px] uppercase text-[#1A080B]/50">End Date</label>
          <input
            className="w-full border-b py-2 outline-none"
            type="date"
            value={data.end_date}
            onChange={(e) => setData({ ...data, end_date: e.target.value })}
          />
          {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
        </div>
        <div className="col-span-2">
          <label className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <input
              type="checkbox"
              checked={data.is_active}
              onChange={(e) => setData({ ...data, is_active: e.target.checked })}
            />
            Active
          </label>
        </div>
      </div>
      <div className="flex gap-4 pt-8">
        <button onClick={handleSubmit} className="flex-1 bg-[#1A080B] text-white py-3 uppercase text-xs tracking-widest">Save Changes</button>
        <button onClick={onCancel} className="px-8 border uppercase text-xs tracking-widest">Cancel</button>
      </div>
    </div>
  );
}