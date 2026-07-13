// src/pages/Profile.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
    const storedRoles = localStorage.getItem("userRole");
    const roles = storedRoles ? JSON.parse(storedRoles) : [];
    const isAdmin = roles.includes("admin");
    const isEmployee = roles.includes("employee") || isAdmin; 
    const isCostumer=roles.includes("costumer") || isAdmin

    return (
        <aside className="w-64 border-r border-[#1A080B]/10 p-8 flex flex-col mx-auto px-auto">
            <h1 className="text-xl font-bold tracking-widest mb-6">CELESTE GOLD</h1>
        
            <nav className="space-y-6 flex-1">
               
                {isAdmin && (
                    <>
                        <Link to="/employees" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Employees</Link>
                        <Link to="/costumers" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Costumer's</Link>
                        <Link to="/products" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Products</Link>
                        <Link to="/categories" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Categorie's</Link>
                        <Link to="/suppliers" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Supplier's</Link>
                        <Link to="/payments" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Payments</Link>
                    
                    </>
                )}

                {isEmployee && (
                    <>
                        <Link to="/work-Schedules" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Work-Schedule</Link>
                        <Link to="/reminders" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Reminders</Link>
                        <Link to="/discounts" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Discounts</Link>
                    </>
                )}
                {isCostumer &&(
                  <>
                      <Link to="/contacts" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> conatcs</Link>
                        <Link to="/reviews" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> reviews</Link>
                                       <Link to="/orders" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Order's</Link>

                        </>
                )}
            </nav>
        </aside>
    );
}