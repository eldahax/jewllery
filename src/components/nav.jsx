import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include", 
        });
        
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      navigate("/login");
      window.location.reload(); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
            Celeste-Gold
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] tracking-widest uppercase font-medium text-[#1A080B]/70">
            <Link to="/home" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">Home</Link>
            <Link to="/shop" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">Shop</Link>
            <Link to="/about" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">About</Link>
            <Link to="/contact" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">Contact</Link>
            <Link to="/dashboard" className="hover:text-[#1A080B] border-b border-transparent hover:border-[#1A080B] pb-0.5 transition-all">Profile</Link>
            
            <span className="w-[1px] h-3 bg-[#1A080B]/20 mx-1" />
            
            {isLoggedIn ? (
              <button onClick={handleLogout} className="hover:text-[#1A080B] transition-colors uppercase">Logout</button>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#1A080B] transition-colors">Login</Link>
                <Link to="/signup" className="hover:text-[#1A080B] bg-[#1A080B] text-white px-3 py-1.5 rounded-[4px] hover:bg-[#4A0E17] transition-all">Signup</Link>
              </>
            )}
          </nav>

          <div className="w-6 h-6 md:hidden pointer-events-none" />
        </div>

    
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-[#1A080B]/5 bg-[#FCFBF9] ${
            open ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-5 px-8 pt-4 pb-8 text-[11px] tracking-[0.2em] uppercase text-[#1A080B]/80 font-medium">
            <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <hr className="border-[#1A080B]/10 my-1" />
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-left text-[#1A080B]">Logout</button>
            ) : (
              <div className="flex gap-6 pt-2">
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="text-[#D4AF37]">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}