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
        try {
            await fetch(`http://localhost:5000/api/suppliers/${id}`, { method: "DELETE" });
            setSuppliers(suppliers.filter(s => s.supplier_id !== id));
        } catch (err) { console.log(err); }
    };

    const filtered = useMemo(() => suppliers.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [suppliers, searchTerm]);

    const paginated = useMemo(() => filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filtered, currentPage]);

    return (
        <>
            <NavBar />
            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />
                <main className="flex-1 p-12">
                    <header className="mb-10 flex justify-between items-center border-b border-[#1A080B]/10 pb-8">
                        <h2 className="text-3xl font-serif">Supplier Management</h2>
                        {!editingSupplier && !isAdding && (
                            <button onClick={() => setIsAdding(true)} className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest">
                                Add Supplier
                            </button>
                        )}
                    </header>

                    {(editingSupplier || isAdding) ? (
                        <SupplierForm 
                            initialData={editingSupplier || { name: "", phone: "", email: "", address: "" }}
                            onCancel={() => { setEditingSupplier(null); setIsAdding(false); }}
                            onSave={handleSave}
                        />
                    ) : (
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
                                                <button onClick={() => setEditingSupplier(s)} className="text-[#D4AF37] uppercase text-[10px] hover:underline">Edit</button>
                                                <button onClick={() => handleDelete(s.supplier_id)} className="text-red-400 uppercase text-[10px] hover:underline">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

function SupplierForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);

    const handleSubmit = () => {
        if (!formData.name || !formData.email) return; // Simple validation
        onSave(formData);
    };

    return (
        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10">
            <div className="space-y-6">
                <input className="w-full border-b py-3 outline-none" placeholder="Supplier Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input className="w-full border-b py-3 outline-none" placeholder="Phone" value={formData.phone || ""} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <input className="w-full border-b py-3 outline-none" placeholder="Email" value={formData.email || ""} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input className="w-full border-b py-3 outline-none" placeholder="Address" value={formData.address || ""} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                
                <div className="flex gap-4 pt-4">
                    <button onClick={handleSubmit} className="bg-[#1A080B] text-white px-8 py-3 text-xs uppercase tracking-widest">Save Supplier</button>
                    <button onClick={onCancel} className="border px-8 py-3 text-xs uppercase tracking-widest">Cancel</button>
                </div>
            </div>
        </div>
    );
}