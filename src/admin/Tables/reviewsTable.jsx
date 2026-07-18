import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function ReviewTable() {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getReviews = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/reviews", {
                credentials: "include",
            });
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/reviews/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            setReviews(reviews.filter((r) => r.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const filtered = useMemo(() => {
        if (!Array.isArray(reviews)) return [];

        return reviews.filter((r) =>
            (r.note || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [reviews, searchTerm]);

    const paginated = useMemo(() => {
        return filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filtered, currentPage]);

    return (
        <>
            <NavBar />
            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />

                <main className="flex-1 p-12">
                    <header className="mb-10 flex justify-between items-center border-b border-[#1A080B]/10 pb-8">
                        <h2 className="text-3xl font-serif">
                            Review Management
                        </h2>

                        <input
                            className="border px-4 py-2 rounded-md"
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </header>

                    <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#F5F3EE] uppercase text-[14px] text-[#1A080B]/60">
                                <tr>
                                    <th className="p-6">ID</th>
                                    <th className="p-6">Product</th>
                                    <th className="p-6">Stars</th>
                                    <th className="p-6">Review</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#1A080B]/5">
                                {paginated.map((r) => (
                                    <tr
                                        key={r.id}
                                        className="hover:bg-[#FCFBF9]"
                                    >
                                        <td className="p-6">{r.id}</td>
                                        <td className="p-6">
                                            {r.Product?.product_name}
                                        </td>
                                        <td className="p-6">{r.stars}</td>
                                        <td className="p-6">{r.note}</td>

                                        <td className="p-6 text-right">
                                            <button
                                                onClick={() =>
                                                    handleDelete(r.id)
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
                </main>
            </div>
        </>
    );
}