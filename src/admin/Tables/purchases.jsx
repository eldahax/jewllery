import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function ContactTable() {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const getContacts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/", {
                credentials: "include",
            });

            const data = await res.json();
            setContacts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const handleSave = async (data) => {
        const isUpdate = !!data.contact_id;

        const url = isUpdate
            ? `http://localhost:5000/api/contacts/${data.contact_id}`
            : "http://localhost:5000/api/contacts";

        try {
            const res = await fetch(url, {
                method: isUpdate ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const saved = await res.json();

            if (isUpdate) {
                setContacts(
                    contacts.map((c) =>
                        c.contact_id === saved.contact_id ? saved : c
                    )
                );
                setEditingContact(null);
            } else {
                setContacts([...contacts, saved]);
                setIsAdding(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/contacts/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            setContacts(
                contacts.filter((c) => c.contact_id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    };

    const filtered = useMemo(() => {
        return contacts.filter((c) =>
            c.fullname
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [contacts, searchTerm]);

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, currentPage]);

    return (
        <>
            <NavBar />

            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />

                <main className="flex-1 p-12">
                    <header className="mb-10 flex justify-between items-center border-b border-[#1A080B]/10 pb-8">
                        <h2 className="text-3xl font-serif">
                            Contact Management
                        </h2>

                        {!editingContact && !isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest"
                            >
                                Add Contact
                            </button>
                        )}
                    </header>

                    {!editingContact && !isAdding && (
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-[#1A080B]/20 px-4 py-2 w-80 rounded outline-none"
                            />
                        </div>
                    )}

                    {editingContact || isAdding ? (
                        <ContactForm
                            initialData={
                                editingContact || {
                                    fullname: "",
                                    email: "",
                                    phone_number: "",
                                    message: "",
                                }
                            }
                            onSave={handleSave}
                            onCancel={() => {
                                setEditingContact(null);
                                setIsAdding(false);
                            }}
                        />
                    ) : (
                        <>
                            <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F5F3EE] uppercase text-[14px] text-[#1A080B]/60">
                                        <tr>
                                            <th className="p-6">Full Name</th>
                                            <th className="p-6">Email</th>
                                            <th className="p-6">Phone</th>
                                            <th className="p-6">Message</th>
                                            <th className="p-6 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#1A080B]/5">
                                        {paginated.map((contact) => (
                                            <tr
                                                key={contact.contact_id}
                                                className="hover:bg-[#FCFBF9]"
                                            >
                                                <td className="p-6 font-medium">
                                                    {contact.fullname}
                                                </td>

                                                <td className="p-6 opacity-70">
                                                    {contact.email}
                                                </td>

                                                <td className="p-6 opacity-70">
                                                    {contact.phone_number}
                                                </td>

                                                <td className="p-6 opacity-70 max-w-sm truncate">
                                                    {contact.message}
                                                </td>

                                                <td className="p-6 text-right space-x-4">
                                                    <button
                                                        onClick={() =>
                                                            setEditingContact(
                                                                contact
                                                            )
                                                        }
                                                        className="text-[#D4AF37] uppercase text-[10px] hover:underline"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                contact.contact_id
                                                            )
                                                        }
                                                        className="text-red-400 uppercase text-[10px] hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                    className="border px-4 py-2 disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span>
                                    Page {currentPage} of{" "}
                                    {Math.max(
                                        1,
                                        Math.ceil(
                                            filtered.length / itemsPerPage
                                        )
                                    )}
                                </span>

                                <button
                                    disabled={
                                        currentPage >=
                                        Math.ceil(
                                            filtered.length /
                                                itemsPerPage
                                        )
                                    }
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
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
function ContactForm({ initialData, onCancel, onSave }) {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        if (
            !formData.fullname?.trim() ||
            !formData.email?.trim() ||
            !formData.message?.trim()
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        onSave(formData);
    };

    return (
        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10 rounded-lg">
            <div className="space-y-6">
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname || ""}
                    onChange={handleChange}
                    className="w-full border-b py-3 outline-none"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full border-b py-3 outline-none"
                />

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number || ""}
                    onChange={handleChange}
                    className="w-full border-b py-3 outline-none"
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    rows={6}
                    value={formData.message || ""}
                    onChange={handleChange}
                    className="w-full border-b py-3 outline-none resize-none"
                />

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#1A080B] text-white px-8 py-3 text-xs uppercase tracking-widest"
                    >
                        Save Contact
                    </button>

                    <button
                        onClick={onCancel}
                        className="border px-8 py-3 text-xs uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}