import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getEmployees = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/employees",{
                 credentials:"include",
            });
            const data = await res.json();
            setEmployees(data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { getEmployees(); }, []);

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp =>
            `${emp.User?.first_name} ${emp.User?.last_name} ${emp.badge_number}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, searchTerm]);

    const paginatedEmployees = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredEmployees.slice(start, start + itemsPerPage);
    }, [filteredEmployees, currentPage]);

    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    const handleCreate = async (data) => {
        try {
            const res = await fetch("http://localhost:5000/api/employees", {
                credentials:"include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Creation failed");
            getEmployees();
            setIsAdding(false);
        } catch (err) { alert("Failed to add employee"); }
    };

    const handleUpdate = async (id, data) => {
        try {
            const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: "PUT",
                 credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const updated = await res.json();
            if (!res.ok) throw new Error(updated.error || "Update failed");
            setEmployees(employees.map(emp => emp.user_id === id ? updated : emp));
            setEditingEmployee(null);
        } catch (err) { console.log(err); }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/employees/${id}`, { method: "DELETE" ,credentials:"include"});
            setEmployees(employees.filter(emp => emp.user_id !== id));
        } catch (err) { console.log(err); }
    };

    return (
        <>
            <NavBar />
            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />
                <main className="flex-1 p-12">
                    <header className="mb-10 border-b border-[#1A080B]/10 pb-8 flex justify-between items-center">
                        <h2 className="text-3xl font-serif">Employee Management</h2>
                        <div className="flex gap-4">
                            <input
                                placeholder="Search..."
                                className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none focus:border-[#D4AF37]"
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            />
                            <button onClick={() => setIsAdding(true)} className="px-6 py-2 bg-[#1A080B] text-white text-xs uppercase tracking-widest">+ Add Employee</button>
                        </div>
                    </header>

                    {isAdding ? (
                        <AddEmployeeForm onCancel={() => setIsAdding(false)} onCreate={handleCreate} />
                    ) : editingEmployee ? (
                        <EditEmployeeForm employee={editingEmployee} onCancel={() => setEditingEmployee(null)} onUpdate={handleUpdate} />
                    ) : (
                        <>
                            <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F5F3EE] uppercase text-[14px] tracking-widest text-[#1A080B]/60">
                                        <tr>
                                            <th className="p-6 font-bold">Name</th>
                                            <th className="p-6 font-bold">Email</th>
                                            <th className="p-6 font-bold">Badge </th>
                                            <th className="p-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A080B]/5">
                                        {paginatedEmployees.map(emp => (
                                            <tr key={emp.user_id} className="hover:bg-[#FCFBF9]">
                                                <td className="p-6">{emp.User?.first_name} {emp.User?.last_name}</td>
                                                <td className="p-6">{emp.User?.email}</td>
                                                <td className="p-6">{emp.badge_number}</td>
                                                <td className="p-6 text-right space-x-6">
                                                    <button onClick={() => setEditingEmployee(emp)} className="text-[#D4AF37] uppercase text-[10px] tracking-widest hover:underline">Edit</button>
                                                    <button onClick={() => handleDelete(emp.user_id)} className="text-red-400 uppercase text-[10px] tracking-widest hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex gap-2 mt-6">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 border text-[10px] uppercase ${currentPage === i + 1 ? "bg-[#1A080B] text-white" : "border-[#1A080B]/10"}`}>
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

function AddEmployeeForm({ onCancel, onCreate }) {
    const [data, setData] = useState({ first_name: "", last_name: "", email: "", password: "", badge_number: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s'-]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{6,}$/;
        const badgeRegex = /^[A-Za-z0-9-_]{3,}$/;

        if (!nameRegex.test(data.first_name)) {
            newErrors.first_name = "First name must be at least 2 characters and contain only letters.";
        }
        if (!nameRegex.test(data.last_name)) {
            newErrors.last_name = "Last name must be at least 2 characters and contain only letters.";
        }
        if (!emailRegex.test(data.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!passwordRegex.test(data.password)) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        if (!badgeRegex.test(data.badge_number)) {
            newErrors.badge_number = "Badge number must be at least 3 alphanumeric characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onCreate(data);
        }
    };

    return (
        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10 space-y-6">
            <h3 className="text-xl font-serif">Add New Employee</h3>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="First Name" value={data.first_name} onChange={e => setData({ ...data, first_name: e.target.value })} />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Last Name" value={data.last_name} onChange={e => setData({ ...data, last_name: e.target.value })} />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" type="password" placeholder="Password" value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Badge Number" value={data.badge_number} onChange={e => setData({ ...data, badge_number: e.target.value })} />
                {errors.badge_number && <p className="text-red-500 text-xs mt-1">{errors.badge_number}</p>}
            </div>
            <div className="flex gap-4">
                <button onClick={handleSubmit} className="flex-1 bg-[#1A080B] text-white py-4 uppercase text-xs tracking-widest">Create</button>
                <button onClick={onCancel} className="px-8 border uppercase text-xs tracking-widest">Cancel</button>
            </div>
        </div>
    );
}

function EditEmployeeForm({ employee, onCancel, onUpdate }) {
    const [data, setData] = useState({
        first_name: employee.User?.first_name || "",
        last_name: employee.User?.last_name || "",
        email: employee.User?.email || "",
        badge_number: employee.badge_number || ""
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z\s'-]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const badgeRegex = /^[A-Za-z0-9-_]{3,}$/;

        if (!nameRegex.test(data.first_name)) {
            newErrors.first_name = "First name must be at least 2 characters and contain only letters.";
        }
        if (!nameRegex.test(data.last_name)) {
            newErrors.last_name = "Last name must be at least 2 characters and contain only letters.";
        }
        if (!emailRegex.test(data.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!badgeRegex.test(data.badge_number)) {
            newErrors.badge_number = "Badge number must be at least 3 alphanumeric characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onUpdate(employee.user_id, data);
        }
    };

    return (
        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10 space-y-6">
            <h3 className="text-xl font-serif">Edit Employee</h3>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="First Name" value={data.first_name} onChange={e => setData({ ...data, first_name: e.target.value })} />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Last Name" value={data.last_name} onChange={e => setData({ ...data, last_name: e.target.value })} />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <input className="w-full border-b py-3 outline-none" placeholder="Badge Number" value={data.badge_number} onChange={e => setData({ ...data, badge_number: e.target.value })} />
                {errors.badge_number && <p className="text-red-500 text-xs mt-1">{errors.badge_number}</p>}
            </div>
            <div className="flex gap-4">
                <button onClick={handleSubmit} className="flex-1 bg-[#1A080B] text-white py-4 uppercase text-xs tracking-widest">Save Changes</button>
                <button onClick={onCancel} className="px-8 border uppercase text-xs tracking-widest">Cancel</button>
            </div>
        </div>
    );
}