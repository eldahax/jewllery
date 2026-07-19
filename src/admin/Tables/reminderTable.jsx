import React, { useEffect, useMemo, useState, useRef } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function ReminderCards() {
  const [reminders, setReminders] = useState([]);
  const [view, setView] = useState("table"); 
  const [editingReminder, setEditingReminder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [activeNotification, setActiveNotification] = useState(null);
  const scheduledTimeouts = useRef(new Set());

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const roles = currentUser.roles || [];
  const isAdmin = roles.includes("admin");

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(true);

  const markAsSent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/reminders/${id}/sent`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    } catch (err) {
      console.error("Failed to mark reminder as sent", err);
    }
  };

  const schedulePopups = (list) => {
    list.forEach((reminder) => {
      const targetId = reminder.id || reminder.reminder_id;
      if (reminder.sent || scheduledTimeouts.current.has(targetId)) return;

      const targetTime = new Date(reminder.remindAt).getTime();
      const now = Date.now();
      const timeUntilTrigger = targetTime - now;

      if (timeUntilTrigger > 0 && timeUntilTrigger < 2147483647) {
        scheduledTimeouts.current.add(targetId);
        setTimeout(() => {
          setActiveNotification(reminder);
          markAsSent(targetId);
        }, timeUntilTrigger);
      }
    });
  };

  const getReminders = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("http://localhost:5000/api/reminders", {
        credentials: "include",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to load reminders");
      }
      
      const list = Array.isArray(data) ? data : data.data || [];
      setReminders(list);

      schedulePopups(list.filter((r) => !r.sent));
    } catch (err) {
      console.error(err);
      setReminders([]);
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    getReminders();
    
    let interval;
    if (view === "table") {
      interval = setInterval(getReminders, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [view]); 
  const filteredReminders = useMemo(() => {
    const now = Date.now();
    return reminders.filter((r) => {
      if (r.sent) return false;

      const targetTime = new Date(r.remindAt).getTime();
      if (targetTime > now) return false;

      const userName = `${r.user?.first_name || ""} ${r.user?.last_name || ""}`;
      const searchTarget = `${r.title || ""} ${r.description || ""} ${userName}`.toLowerCase();
      return searchTarget.includes(searchTerm.toLowerCase());
    });
  }, [reminders, searchTerm]);

  const paginatedReminders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReminders.slice(start, start + itemsPerPage);
  }, [filteredReminders, currentPage]);

  const totalPages = Math.ceil(filteredReminders.length / itemsPerPage) || 1;

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("Are you sure you want to delete this reminder?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/reminders/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: authHeaders(),
      });
      if (res.ok) {
        getReminders();
      } else {
        const data = await res.json();
        alert(data?.error || "Failed to delete reminder");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: Could not delete reminder");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">
        <Profile />
        <main className="flex-1 p-8 lg:p-12 relative">
          
          {activeNotification && (
            <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#1A080B] text-white p-6 rounded shadow-2xl border border-white/10">
              <div className="flex justify-between items-start gap-4 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-[#9E7B27] font-bold">
                  🔔 Alert Triggered
                </span>
                <button
                  onClick={() => setActiveNotification(null)}
                  className="text-white/60 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <h4 className="font-serif text-base font-semibold">{activeNotification.title}</h4>
              <p className="text-xs text-white/80 mt-2">{activeNotification.description || "No description provided."}</p>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveNotification(null)}
                  className="bg-[#9E7B27] text-white px-4 py-1.5 text-[10px] uppercase tracking-widest hover:opacity-95 transition-opacity"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          )}

          <header className="mb-8 border-b border-[#1A080B]/10 pb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-serif">
                  {isAdmin ? "Reminders" : "Your Reminders"}
                </h2>
                <p className="text-xs text-[#1A080B]/60 mt-1 uppercase tracking-wider">
                  {view === "table"
                    ? "Manage your active tasks & alerts"
                    : view === "add"
                    ? "Create a new entry"
                    : "Update details"}
                </p>
              </div>

              {view === "table" ? (
                <div className="flex gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none focus:border-[#1A080B] w-full sm:w-auto bg-white"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setEditingReminder(null);
                        setView("add");
                      }}
                      className="bg-[#1A080B] text-white px-5 py-2 text-xs uppercase tracking-widest hover:opacity-90 whitespace-nowrap transition-opacity"
                    >
                      + New Reminder
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setView("table");
                    setEditingReminder(null);
                  }}
                  className="px-5 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest hover:bg-[#1A080B]/5 transition-colors"
                >
                  ← Back to List
                </button>
              )}
            </div>
          </header>

          {loadError && (
            <div className="mb-6 border border-red-200 bg-red-50 text-red-700 text-xs px-4 py-3 uppercase tracking-wider">
              {loadError}
            </div>
          )}

          {view === "edit" || view === "add" ? (
            <ReminderForm
              mode={view}
              reminder={editingReminder}
              isAdmin={isAdmin}
              currentUser={currentUser}
              authHeaders={authHeaders}
              onCancel={() => {
                setView("table");
                setEditingReminder(null);
              }}
              onSuccess={() => {
                getReminders();
                setView("table");
                setEditingReminder(null);
              }}
            />
          ) : (
            <>
              {loading ? (
                <p className="text-xs uppercase tracking-widest text-[#1A080B]/50 py-12">
                  Loading entries...
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedReminders.map((r) => {
                    const targetId = r.id || r.reminder_id;
                    return (
                      <div
                        key={targetId}
                        className="bg-white border border-[#1A080B]/10 p-6 shadow-sm flex flex-col justify-between hover:border-[#1A080B]/30 transition-all"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <h3 className="font-serif text-lg font-medium text-[#1A080B]">
                              {r.title}
                            </h3>
                          </div>

                          <p className="text-[11px] text-[#9E7B27] uppercase tracking-wider font-semibold mb-3">
                            🕒 {r.remindAt ? new Date(r.remindAt).toLocaleString() : "—"}
                          </p>

                          {isAdmin && r.user && (
                            <p className="text-xs text-[#1A080B]/70 mb-2">
                              <span className="font-bold uppercase tracking-wider text-[9px] opacity-60 block">Assigned To</span>
                              {`${r.user.first_name || ""} ${r.user.last_name || ""}`.trim() || r.user.email}
                            </p>
                          )}

                          <p className="text-xs text-[#1A080B]/70 line-clamp-3 mb-6">
                            {r.description || "No description provided."}
                          </p>
                        </div>

                        {isAdmin && (
                          <div className="pt-4 border-t border-[#1A080B]/5 flex justify-end gap-4">
                            <button
                              onClick={() => {
                                setEditingReminder(r);
                                setView("edit");
                              }}
                              className="text-[#9E7B27] hover:text-[#1A080B] uppercase text-[10px] tracking-widest font-bold transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(targetId)}
                              className="text-red-500 hover:text-red-700 uppercase text-[10px] tracking-widest font-bold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {paginatedReminders.length === 0 && (
                    <div className="col-span-full p-12 text-center text-xs uppercase tracking-widest opacity-50 bg-white border border-[#1A080B]/10">
                      No reminders found.
                    </div>
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#1A080B]/10 text-xs">
                  <span className="uppercase tracking-widest text-[#1A080B]/60 text-[10px]">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border text-[10px] uppercase tracking-widest transition-colors ${
                          currentPage === i + 1
                            ? "bg-[#1A080B] text-white border-[#1A080B]"
                            : "border-[#1A080B]/10 hover:bg-[#1A080B]/5"
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

function ReminderForm({ mode, reminder, isAdmin, currentUser, authHeaders, onCancel, onSuccess }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    remindAt: "",
    user_id: "",
  });
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const formatForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    const offsetMs = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offsetMs).toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (reminder) {
      setData({
        title: reminder.title || "",
        description: reminder.description || "",
        remindAt: formatForInput(reminder.remindAt),
        user_id: reminder.user_id || reminder.user?.user_id || "",
      });
    } else {
      setData({
        title: "",
        description: "",
        remindAt: "",
        user_id: currentUser.user_id || "",
      });
    }
  }, [reminder, currentUser]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees", {
          credentials: "include",
          headers: authHeaders(),
        });
        const emp = await res.json();
        if (Array.isArray(emp)) {
          setEmployees(emp);
        }
      } catch (err) {
        console.error("Error loading employees:", err);
      }
    };
    fetchEmployees();
  }, [isAdmin]);

  const validate = () => {
    const newErrors = {};
    if (!data.title.trim()) newErrors.title = "Title is required.";
    if (!data.remindAt) newErrors.remindAt = "Reminder date/time is required.";
    if (isAdmin && !data.user_id) newErrors.user_id = "Please select an assignee.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      title: data.title.trim(),
      description: data.description.trim(),
      remindAt: data.remindAt,
      user_id: isAdmin ? Number(data.user_id) : currentUser.user_id,
    };

    const targetId = reminder?.id || reminder?.reminder_id;
    const url =
      mode === "edit"
        ? `http://localhost:5000/api/reminders/${targetId}`
        : "http://localhost:5000/api/reminders";

    try {
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: authHeaders(),
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || result?.message || "Operation failed");
      }

      onSuccess(result);
    } catch (err) {
      console.error(err);
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 border border-[#1A080B]/10 shadow-sm">
      <h3 className="text-xl font-serif mb-6 border-b border-[#1A080B]/10 pb-3">
        {mode === "edit" ? "Edit Reminder" : "New Reminder"}
      </h3>

      {serverError && (
        <div className="mb-6 p-3 border border-red-200 bg-red-50 text-red-700 text-xs">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">
            Title *
          </label>
          <input
            className="w-full border-b border-[#1A080B]/20 py-2 outline-none focus:border-[#1A080B] text-sm"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="e.g. Restock materials"
          />
          {errors.title && <p className="text-red-500 text-[10px] mt-1">{errors.title}</p>}
        </div>

        {isAdmin && (
          <div className="col-span-2">
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">
              Assign to Employee *
            </label>
            <select
              className="w-full border-b border-[#1A080B]/20 py-2 outline-none focus:border-[#1A080B] bg-white text-sm text-[#1A080B]"
              value={data.user_id}
              onChange={(e) => setData({ ...data, user_id: e.target.value })}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => {
                const uid = emp.user_id || emp.User?.user_id || emp.id || emp.employee_id;
                const firstName = emp.User?.first_name || emp.first_name || "";
                const lastName = emp.User?.last_name || emp.last_name || "";
                const email = emp.User?.email || emp.email || "";

                return (
                  <option key={uid} value={uid}>
                    {firstName || lastName ? `${firstName} ${lastName}`.trim() : email}
                  </option>
                );
              })}
            </select>
            {errors.user_id && <p className="text-red-500 text-[10px] mt-1">{errors.user_id}</p>}
          </div>
        )}

        <div className="col-span-2">
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">
            Remind At *
          </label>
          <input
            type="datetime-local"
            className="w-full border-b border-[#1A080B]/20 py-2 outline-none focus:border-[#1A080B] text-sm"
            value={data.remindAt}
            onChange={(e) => setData({ ...data, remindAt: e.target.value })}
          />
          {errors.remindAt && <p className="text-red-500 text-[10px] mt-1">{errors.remindAt}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-[10px] uppercase tracking-widest font-bold mb-1 opacity-70">
            Description
          </label>
          <textarea
            className="w-full border-b border-[#1A080B]/20 py-2 outline-none focus:border-[#1A080B] text-sm"
            rows="3"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Add optional notes or context..."
          />
        </div>
      </div>

      <div className="flex gap-4 pt-8 border-t border-[#1A080B]/10 mt-6">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex-1 bg-[#1A080B] text-white py-3 uppercase text-xs tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Reminder"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-8 border border-[#1A080B]/20 uppercase text-xs tracking-widest hover:bg-[#1A080B]/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}