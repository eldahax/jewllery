import React from "react";
import { Router,Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Profile(){
    return (
        <>
              <aside className="w-64 border-r border-[#1A080B]/10 p-8 flex flex-col mx-auto px-auto">
                <h1 className="text-xl font-bold tracking-widest mb-6">CELESTE GOLD</h1>
            
                <nav className="space-y-6 flex-1">
                  <Link to="/employees"  className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Employees</Link>
                  <Link  to="/costumers" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Costumer's</Link>
                  <Link  to="/products" className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Products</Link>
                  <Link  to="/categories"  className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Categorie's</Link>
                  <Link  to="/offers"    className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Offers</Link>
                  <Link   to="/suppliers"   className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Supplier's</Link>
                  <Link   to="/purchases"  className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Purchases</Link>
                  <Link  to="/returns"  className="block w-full text-left font-medium uppercase text-[17px] tracking-widest text-[#9D8126]"> Return's</Link>
                </nav>
              </aside>
        
        </>
    )
}