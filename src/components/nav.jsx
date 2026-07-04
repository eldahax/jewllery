import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#1A080B] text-[#FCFBF9] text-center text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase py-2 px-4 transition-all">
        Free shipping over 350€
      </div>

      <header className="sticky top-0 z-50 w-full bg-[#FCFBF9]/90 backdrop-blur-md border-b border-[#1A080B]/10 shadow-sm">
        <div className="flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
          
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col items-center justify-center w-6 h-6 gap-1.5 focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[1px] bg-[#1A080B] transition-transform duration-300 ease-in-out ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-[1px] bg-[#1A080B] transition-opacity duration-300 ease-in-out ${open ? "opacity-0" : ""}`} />
            <span className={`w-6 h-[1px] bg-[#1A080B] transition-transform duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          <Link
            to="/"
            className="text-sm sm:text-base md:text-xl font-bold tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] uppercase text-[#1A080B] transition-all whitespace-nowrap absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            Kolica-Gold
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] tracking-widest uppercase font-medium text-[#1A080B]/70">
           <Link to="/Home" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">
              Shop
            </Link>
            <Link to="/about" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">
              About
            </Link>
            <Link to="/blog" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">
              Contact
            </Link>
            <span className="w-[1px] h-3 bg-[#1A080B]/20 mx-1" />
            <Link to="/login" className="hover:text-[#1A080B] transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hover:text-[#1A080B] bg-[#1A080B] text-white px-3 py-1.5 rounded-[4px] hover:bg-[#4A0E17] transition-all">
              Signup
            </Link>
          </nav>

          <div className="w-6 h-6 md:hidden pointer-events-none" />
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-[#1A080B]/5 bg-[#FCFBF9] ${
            open ? "max-h-[350px] opacity-100 visibility-visible" : "max-h-0 opacity-0 visibility-hidden pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-5 px-8 pt-4 pb-8 text-[11px] tracking-[0.2em] uppercase text-[#1A080B]/80 font-medium">
            <Link to="/shop" onClick={() => setOpen(false)} className="hover:text-[#1A080B] transition-colors py-1">Shop</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="hover:text-[#1A080B] transition-colors py-1">About</Link>
            <Link to="/blog" onClick={() => setOpen(false)} className="hover:text-[#1A080B] transition-colors py-1">Blog</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-[#1A080B] transition-colors py-1">Contact</Link>
            <hr className="border-[#1A080B]/10 my-1" />
            <div className="flex gap-6 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-[#1A080B] transition-colors py-1">Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="text-[#D4AF37] transition-colors py-1">Signup</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}