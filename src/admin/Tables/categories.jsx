import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function CategoryTable() {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getCategories = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/categories",{
                 credentials:"include",
            });
            const data = await res.json();
            setCategories(data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { getCategories(); }, []);

    const handleSave = async (data) => {
        const isUpdate = !!data.category_id;
        const url = isUpdate 
            ? `http://localhost:5000/api/categories/${data.category_id}` 
            : "http://localhost:5000/api/categories";
        
        try {
            const res = await fetch(url, {
                method: isUpdate ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            });
            const saved = await res.json();
            
            if (isUpdate) {
                setCategories(categories.map(c => c.category_id === saved.category_id ? saved : c));
                setEditingCategory(null);
            } else {
                setCategories([...categories, saved]);
                setIsAdding(false);
            }
        } catch (err) { console.log(err); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure?")) return;
        try {
            await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE", credentials: "include" });
            setCategories(categories.filter(c => c.category_id !== id));
        } catch (err) { console.log(err); }
    };

    const filtered = useMemo(() => categories.filter(c => 
        c.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [categories, searchTerm]);

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
                            <h2 className="text-3xl font-serif">Category Management</h2>
                            <div className="flex gap-4">
                                <input
                                    placeholder="Search categories..."
                                    className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none focus:border-[#D4AF37]"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                {!editingCategory && !isAdding && (
                                    <button onClick={() => setIsAdding(true)} className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest">
                                        Add Category
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>

                    {(editingCategory || isAdding) ? (
                        <CategoryForm 
                            initialData={editingCategory || { category_name: "", description: "" }}
                            onCancel={() => { setEditingCategory(null); setIsAdding(false); }}
                            onSave={handleSave}
                        />
                    ) : (
                        <>
                            <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F5F3EE] uppercase text-[14px] text-[#1A080B]/60">
                                        <tr>
                                            <th className="p-6">Category Name</th>
                                            <th className="p-6">Description</th>
                                            <th className="p-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A080B]/5">
                                        {paginated.map((c) => (
                                            <tr key={c.category_id} className="hover:bg-[#FCFBF9]">
                                                <td className="p-6 font-medium">{c.category_name}</td>
                                                <td className="p-6 opacity-70">{c.description}</td>
                                                <td className="p-6 text-right space-x-4">
                                                    <button onClick={() => setEditingCategory(c)} className="text-[#D4AF37] uppercase text-[10px] hover:underline">Edit</button>
                                                    <button onClick={() => handleDelete(c.category_id)} className="text-red-400 uppercase text-[10px] hover:underline">Delete</button>
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

function CategoryForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s'-]{2,}$/;

        if (!nameRegex.test(formData.category_name)) {
            newErrors.category_name = "Category name must be at least 2 characters and contain only letters.";
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
                    <input className="w-full border-b py-3 outline-none" placeholder="Category Name" value={formData.category_name} onChange={(e) => setFormData({...formData, category_name: e.target.value})} />
                    {errors.category_name && <p className="text-red-500 text-[10px] mt-1  tracking-widest">{errors.category_name}</p>}
                </div>
                <div>
                    <input className="w-full border-b py-3 outline-none" placeholder="Description" value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button onClick={handleSubmit} className="bg-[#1A080B] text-white px-8 py-3 text-xs uppercase tracking-widest">Save Category</button>
                    <button onClick={onCancel} className="border px-8 py-3 text-xs uppercase tracking-widest">Cancel</button>
                </div>
            </div>
        </div>
    );
}