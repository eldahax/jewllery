import React, { useState, useEffect } from "react";
import NavBar from "../components/nav";
import Profile from "../pages/Profile";

export default function PersonalProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          setUser({
            name: storedUser.name || (storedUser.first_name && storedUser.last_name ? `${storedUser.first_name} ${storedUser.last_name}` : storedUser.first_name || ""),
            email: storedUser.email || "",
            phone: storedUser.phone || "",
            address: storedUser.address || "",
          });
        }
      } catch (err) {
        console.error("Error reading user profile from storage:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FDFDFC] items-center justify-center text-[#1A080B]">
        <p className="text-sm uppercase tracking-widest animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />

      <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B]">
        <Profile />

        <main className="flex-1 p-12">
          <header className="mb-10 border-b border-[#1A080B]/10 pb-8">
            <h1 className="text-4xl font-serif">
              My Profile
            </h1>
            <p className="mt-2 text-sm opacity-60">
              View your account information
            </p>
          </header>

          <div className="max-w-7xl bg-white border border-[#1A080B]/10 rounded-lg p-10">
            <div className="flex items-center gap-8 mb-10">
              <div className="w-28 h-28 rounded-full bg-[#1A080B] text-white flex items-center justify-center text-4xl font-serif">
                {user.name ? user.name.charAt(0) : "U"}
              </div>

              <div>
                <h2 className="text-3xl font-serif">
                  {user.name}
                </h2>
                <p className="uppercase text-xs tracking-widest opacity-60">
                  {user.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60">
                  Name
                </label>
                <input
                  name="name"
                  value={user.name}
                  disabled={true}
                  className="w-full border-b border-[#1A080B]/20 py-3 outline-none disabled:bg-transparent cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60">
                  Email
                </label>
                <input
                  name="email"
                  value={user.email}
                  disabled={true}
                  className="w-full border-b border-[#1A080B]/20 py-3 outline-none disabled:bg-transparent cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60">
                  Phone
                </label>
                <input
                  name="phone"
                  value={user.phone || ""}
                  disabled={true}
                  className="w-full border-b border-[#1A080B]/20 py-3 outline-none disabled:bg-transparent cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60">
                  Address
                </label>
                <input
                  name="address"
                  value={user.address || ""}
                  disabled={true}
                  className="w-full border-b border-[#1A080B]/20 py-3 outline-none disabled:bg-transparent cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-10 max-w-4xl">
            <div className="bg-white border border-[#1A080B]/10 p-6">
              <p className="text-xs uppercase opacity-60">
                Orders
              </p>
              <p className="text-3xl font-serif mt-3">
                12
              </p>
            </div>

            <div className="bg-white border border-[#1A080B]/10 p-6">
              <p className="text-xs uppercase opacity-60">
                Wishlist
              </p>
              <p className="text-3xl font-serif mt-3">
                8
              </p>
            </div>

            <div className="bg-white border border-[#1A080B]/10 p-6">
              <p className="text-xs uppercase opacity-60">
                Member Since
              </p>
              <p className="text-3xl font-serif mt-3">
                2026
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}