import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function SupplierTable() {
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getSuppliers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/suppliers",{
                 credentials:"include",
            });
            const data = await res.json();
            setSuppliers(data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { getSuppliers(); }, []);

    const handleSave = async (data) => {
        const isUpdate = !!data.supplier_id;
        const url = isUpdate 
            ? `http://localhost:5000/api/suppliers/${data.supplier_id}` 
            : "http://localhost:5000/api/suppliers";
        
        try {
            const res = await fetch(url, {
                method: isUpdate ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });
            const saved = await res.json();
            
            if (isUpdate) {
                setSuppliers(suppliers.map(s => s.supplier_id === saved.supplier_id ? saved : s));
                setEditingSupplier(null);
            } else {
                setSuppliers([...suppliers, saved]);
                setIsAdding(false);
            }
        } catch (err) { console.log(err); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("are you sure?")) return;
        try {
            await fetch(`http://localhost:5000/api/suppliers/${id}`, { method: "DELETE", credentials: "include" });
            setSuppliers(suppliers.filter(s => s.supplier_id !== id));
        } catch (err) { console.log(err); }
    };

    const filtered = useMemo(() => suppliers.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [suppliers, searchTerm]);

    const paginated = useMemo(() => filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filtered, currentPage]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <>
            <NavBar />
            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />
                <main className="flex-1 p-12">
                    <header className="mb-10 border-b border-[#1A080B]/10 pb-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-serif">Supplier Management</h2>
                            <div className="flex gap-4">
                                <input
                                    placeholder="search suppliers..."
                                    className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none focus:border-[#D4AF37]"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                {!editingSupplier && !isAdding && (
                                    <button onClick={() => setIsAdding(true)} className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest">
                                        Add Supplier
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>

                    {(editingSupplier || isAdding) ? (
                        <SupplierForm 
                            initialData={editingSupplier || { name: "", phone: "", email: "", address: "" }}
                            onCancel={() => { setEditingSupplier(null); setIsAdding(false); }}
                            onSave={handleSave}
                        />
                    ) : (
                        <>
                            <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F5F3EE] uppercase text-[14px] text-[#1A080B]/60">
                                        <tr>
                                            <th className="p-6">Name</th>
                                            <th className="p-6">Phone</th>
                                            <th className="p-6">Email</th>
                                            <th className="p-6">Address</th>
                                            <th className="p-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A080B]/5">
                                        {paginated.map((s) => (
                                            <tr key={s.supplier_id} className="hover:bg-[#FCFBF9]">
                                                <td className="p-6 font-medium">{s.name}</td>
                                                <td className="p-6 opacity-70">{s.phone}</td>
                                                <td className="p-6 opacity-70">{s.email}</td>
                                                <td className="p-6 opacity-70">{s.address}</td>
                                                <td className="p-6 text-right space-x-4">
                                                    <button onClick={() => setEditingSupplier(s)} className="text-[#D4AF37] uppercase text-[10px] hover:underline">edit</button>
                                                    <button onClick={() => handleDelete(s.supplier_id)} className="text-red-400 uppercase text-[10px] hover:underline">delete</button>
                                                </td>
                                            </tr>
                                        ))}
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
                    )}
                </main>
            </div>
        </>
    );
}

function SupplierForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z0-9\s'-]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\d\s\-+()]{7,}$/;

        if (!nameRegex.test(formData.name)) {
            newErrors.name = "supplier name must be at least 2 characters.";
        }
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "please enter a valid email address.";
        }
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            newErrors.phone = "please enter a valid phone number.";
        }
        if (!formData.address || formData.address.trim().length < 3) {
            newErrors.address = "address must be at least 3 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        onSave(formData);
    };

    return (
        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10">
            <div className="space-y-6">
                <div>
                    <input className="w-full border-b py-3 outline-none" placeholder="Supplier Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1  tracking-widest">{errors.name}</p>}
                </div>
                <div>
                    <input className="w-full border-b py-3 outline-none" placeholder="Phone" value={formData.phone || ""} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-1  tracking-widest">{errors.phone}</p>}
                </div>
                <div>
                    <input className="w-full border-b py-3 outline-none" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1  tracking-widest">{errors.email}</p>}
                </div>
                <div>
                    <input className="w-full border-b py-3 outline-none" placeholder="Address" value={formData.address || ""} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    {errors.address && <p className="text-red-500 text-[10px] mt-1  tracking-widest">{errors.address}</p>}
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button onClick={handleSubmit} className="bg-[#1A080B] text-white px-8 py-3 text-xs uppercase tracking-widest">Save Supplier</button>
                    <button onClick={onCancel} className="border px-8 py-3 text-xs  tracking-widest">Cancel</button>
                </div>
            </div>
        </div>
    );
}