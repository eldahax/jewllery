import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function WorkScheduleTable({ isAdmin }) {
    const [schedules, setSchedules] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");

    const itemsPerPage = 10;

    const getData = async () => {
        try {
            setError("");

            const [schedRes, empRes] = await Promise.all([
                fetch("http://localhost:5000/api/work-schedules", {
                    credentials: "include"
                }),
                fetch("http://localhost:5000/api/employees", {
                    credentials: "include"
                })
            ]);

            if (!schedRes.ok || !empRes.ok) {
                throw new Error("failed to fetch data.");
            }

            const schedData = await schedRes.json();
            const empData = await empRes.json();

            setSchedules(Array.isArray(schedData) ? schedData : []);
            setEmployees(Array.isArray(empData) ? empData : []);
        } catch (err) {
            console.error("fetch error:", err);
            setError("unable to load work schedules. please try again.");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const employeeOptions = useMemo(() => {
        return employees.map((emp) => ({
            user_id: emp.user_id,
            first_name: emp.User?.first_name || "unknown",
            last_name: emp.User?.last_name || ""
        }));
    }, [employees]);

    const groupedSchedules = useMemo(() => {
        const groups = {};

        schedules.forEach((schedule) => {
            const userId = schedule.user_id;

            if (!groups[userId]) {
                groups[userId] = {
                    user_id: userId,
                    employee: schedule.User,
                    schedules: []
                };
            }

            groups[userId].schedules.push(schedule);
        });

        return Object.values(groups);
    }, [schedules]);

    const totalPages = Math.ceil(
        groupedSchedules.length / itemsPerPage
    );

    const paginatedGroups = useMemo(() => {
        return groupedSchedules.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [groupedSchedules, currentPage]);

    const handleSave = async (data) => {
        const isUpdate = !!data.schedule_id;

        const url = isUpdate
            ? `http://localhost:5000/api/work-schedules/${data.schedule_id}`
            : "http://localhost:5000/api/work-schedules";

        try {
            setError("");

            const res = await fetch(url, {
                method: isUpdate ? "PUT" : "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const responseData = await res.json().catch(() => ({}));

                throw new Error(
                    responseData.message || "failed to save work schedule."
                );
            }

            await getData();

            setEditingSchedule(null);
            setIsAdding(false);
        } catch (err) {
            console.error("save error:", err);
            setError(err.message || "unable to save work schedule.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "are you sure you want to delete this work schedule?"
        );

        if (!confirmDelete) return;

        try {
            setError("");

            const res = await fetch(
                `http://localhost:5000/api/work-schedules/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            if (!res.ok) {
                throw new Error("failed to delete work schedule.");
            }

            setSchedules((prevSchedules) =>
                prevSchedules.filter(
                    (schedule) => schedule.schedule_id !== id
                )
            );
        } catch (err) {
            console.error("delete error:", err);
            setError(
                "unable to delete work schedule. please try again."
            );
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBar />

            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
                <Profile />

                <main className="flex-1 p-6 md:p-12">
                    <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b border-[#1A080B]/10 pb-8">
                        <h2 className="text-3xl font-serif">
                            work schedule management
                        </h2>

                        {/* Only show Add button if user is admin */}
                        {isAdmin && !editingSchedule && !isAdding && (
                            <button
                                onClick={() => {
                                    setError("");
                                    setIsAdding(true);
                                }}
                                className="bg-[#1A080B] text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#321116] transition"
                            >
                                add schedule
                            </button>
                        )}
                    </header>

                    {error && (
                        <div className="mb-6 border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    {isAdmin && (editingSchedule || isAdding) ? (
                        <WorkScheduleForm
                            initialData={
                                editingSchedule || {
                                    user_id: "",
                                    work_date: "",
                                    start_time: "",
                                    end_time: "",
                                    shift: "morning",
                                    notes: ""
                                }
                            }
                            employees={employeeOptions}
                            onCancel={() => {
                                setEditingSchedule(null);
                                setIsAdding(false);
                                setError("");
                            }}
                            onSave={handleSave}
                        />
                    ) : (
                        <>
                            <div className="space-y-10">
                                {paginatedGroups.length > 0 ? (
                                    paginatedGroups.map((group) => (
                                        <div
                                            key={group.user_id}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#1A080B] text-white flex items-center justify-center text-sm font-semibold uppercase">
                                                    {group.employee?.first_name?.charAt(0) || "?"}
                                                    {group.employee?.last_name?.charAt(0) || ""}
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-serif">
                                                        {group.employee?.first_name || "unknown"}{" "}
                                                        {group.employee?.last_name || ""}
                                                    </h3>

                                                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                                                        {group.schedules.length}{" "}
                                                        {group.schedules.length === 1
                                                            ? "schedule"
                                                            : "schedules"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 pl-0 md:pl-14">
                                                {group.schedules.map((s) => (
                                                    <div
                                                        key={s.schedule_id}
                                                        className="bg-white border border-[#1A080B]/10 rounded-lg shadow-sm p-5 hover:shadow-md transition"
                                                    >
                                                        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                                                        date
                                                                    </p>

                                                                    <p className="text-sm font-medium">
                                                                        {s.work_date || "—"}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                                                        time
                                                                    </p>

                                                                    <p className="text-sm font-medium">
                                                                        {s.start_time || "—"}{" "}
                                                                        -{" "}
                                                                        {s.end_time || "—"}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                                                        shift
                                                                    </p>

                                                                    <span className="inline-block bg-[#F5E7B8] text-[#1A080B] px-3 py-1 rounded-full text-xs capitalize">
                                                                        {s.shift || "—"}
                                                                    </span>
                                                                </div>

                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                                                                        notes
                                                                    </p>

                                                                    <p className="text-sm truncate max-w-[200px]">
                                                                        {s.notes || "—"}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Only show Edit and Delete buttons if user is admin */}
                                                            {isAdmin && (
                                                                <div className="flex gap-5 lg:border-l lg:border-[#1A080B]/10 lg:pl-5">
                                                                    <button
                                                                        onClick={() => {
                                                                            setError("");
                                                                            setEditingSchedule(s);
                                                                        }}
                                                                        className="text-[#B18B1E] text-xs uppercase tracking-wider hover:underline"
                                                                    >
                                                                        edit
                                                                    </button>

                                                                    <button
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                s.schedule_id
                                                                            )
                                                                        }
                                                                        className="text-red-500 text-xs uppercase tracking-wider hover:underline"
                                                                    >
                                                                        delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white border border-[#1A080B]/10 p-12 text-center">
                                        <p className="text-gray-500 text-sm">
                                            no work schedules found.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-10">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage - 1
                                            )
                                        }
                                        className="border border-[#1A080B]/20 px-4 py-2 text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1A080B] hover:text-white transition"
                                    >
                                        previous
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, index) => index + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            className={`w-9 h-9 text-xs transition ${
                                                currentPage === page
                                                    ? "bg-[#1A080B] text-white"
                                                    : "border border-[#1A080B]/20 hover:bg-[#F5E7B8]"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                currentPage + 1
                                            )
                                        }
                                        className="border border-[#1A080B]/20 px-4 py-2 text-xs uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1A080B] hover:text-white transition"
                                    >
                                        next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </>
    );
}

function WorkScheduleForm({
    initialData,
    onCancel,
    onSave,
    employees
}) {
    const [formData, setFormData] = useState({
        ...initialData,
        user_id: initialData.user_id || "",
        work_date: initialData.work_date || "",
        start_time: initialData.start_time || "",
        end_time: initialData.end_time || "",
        shift: initialData.shift || "morning",
        notes: initialData.notes || ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.user_id) {
            newErrors.user_id = "please select an employee.";
        }

        if (!formData.work_date) {
            newErrors.work_date = "please select a work date.";
        }

        if (!formData.start_time) {
            newErrors.start_time = "please select a start time.";
        }

        if (!formData.end_time) {
            newErrors.end_time = "please select an end time.";
        }

        if (
            formData.start_time &&
            formData.end_time &&
            formData.end_time <= formData.start_time
        ) {
            newErrors.end_time =
                "end time must be later than start time.";
        }

        if (!formData.shift) {
            newErrors.shift = "please select a shift.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        onSave({
            ...formData,
            user_id: Number(formData.user_id)
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl bg-white p-6 md:p-10 border border-[#1A080B]/10 shadow-sm"
        >
            <div className="space-y-6">
                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                        employee
                    </label>

                    <select
                        name="user_id"
                        className="w-full border-b border-[#1A080B]/20 py-3 outline-none bg-transparent lowercase focus:border-[#1A080B]"
                        value={formData.user_id}
                        onChange={handleChange}
                    >
                        <option value="">
                            select employee
                        </option>

                        {employees.map((employee) => (
                            <option
                                key={employee.user_id}
                                value={employee.user_id}
                            >
                                {employee.first_name}{" "}
                                {employee.last_name}
                            </option>
                        ))}
                    </select>

                    {errors.user_id && (
                        <p className="text-red-500 text-[10px] mt-2 tracking-widest">
                            {errors.user_id}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                        work date
                    </label>

                    <input
                        type="date"
                        name="work_date"
                        className="w-full border-b border-[#1A080B]/20 py-3 outline-none lowercase focus:border-[#1A080B]"
                        value={formData.work_date}
                        onChange={handleChange}
                    />

                    {errors.work_date && (
                        <p className="text-red-500 text-[10px] mt-2 tracking-widest">
                            {errors.work_date}
                        </p>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full">
                        <label className="block text-xs uppercase tracking-widest mb-2">
                            start time
                        </label>

                        <input
                            type="time"
                            name="start_time"
                            className="w-full border-b border-[#1A080B]/20 py-3 outline-none lowercase focus:border-[#1A080B]"
                            value={formData.start_time}
                            onChange={handleChange}
                        />

                        {errors.start_time && (
                            <p className="text-red-500 text-[10px] mt-2 tracking-widest">
                                {errors.start_time}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label className="block text-xs uppercase tracking-widest mb-2">
                            end time
                        </label>

                        <input
                            type="time"
                            name="end_time"
                            className="w-full border-b border-[#1A080B]/20 py-3 outline-none lowercase focus:border-[#1A080B]"
                            value={formData.end_time}
                            onChange={handleChange}
                        />

                        {errors.end_time && (
                            <p className="text-red-500 text-[10px] mt-2 tracking-widest">
                                {errors.end_time}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                        shift
                    </label>

                    <select
                        name="shift"
                        className="w-full border-b border-[#1A080B]/20 py-3 outline-none bg-transparent lowercase focus:border-[#1A080B]"
                        value={formData.shift}
                        onChange={handleChange}
                    >
                        <option value="morning">
                            morning
                        </option>

                        <option value="afternoon">
                            afternoon
                        </option>

                        <option value="night">
                            night
                        </option>
                    </select>

                    {errors.shift && (
                        <p className="text-red-500 text-[10px] mt-2 tracking-widest">
                            {errors.shift}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                        notes
                    </label>

                    <input
                        type="text"
                        name="notes"
                        className="w-full border-b border-[#1A080B]/20 py-3 outline-none lowercase focus:border-[#1A080B]"
                        placeholder="add notes (optional)"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-[#1A080B] text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#321116] transition"
                    >
                        save schedule
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="border border-[#1A080B]/20 px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#F5E7B8] transition"
                    >
                        cancel
                    </button>
                </div>
            </div>
        </form>
    );
}