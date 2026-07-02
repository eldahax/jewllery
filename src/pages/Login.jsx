import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [serverError, setServerError] = useState("");

  const userregex = /^[A-Za-z0-9.-_!]+@[a-zA-Z-_]+\.[a-z]{3}$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    setUserError("");
    setPassError("");

    if (username.trim() === "") {
      setUserError("Please enter your registered email");
      hasError = true;
    } else if (!userregex.test(username)) {
      setUserError("Please enter a valid email address");
      hasError = true;
    }

    if (password.trim() === "") {
      setPassError("Please enter your password");
      hasError = true;
    } else if (!passRegex.test(password)) {
      setPassError("Invalid password format");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: username, password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error);
        return;
      }

      if (data.user && data.user.roles && data.user.roles.length > 0) {
        localStorage.setItem("userRole", JSON.stringify(data.user.roles));
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/Home");
    } catch (err) {
      console.error(err);
      alert("Could not connect to the boutique server.");
    }
  };

  return (

    <div className="flex justify-center items-center w-full h-screen bg-[#FCFBF9] font-serif">
      

      <div className="w-full max-w-md p-10 bg-white border border-[#D4AF37]/30 shadow-[0_15px_40px_rgba(74,14,23,0.05)] rounded-sm">
        
   
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-[#4A0E17] tracking-[0.35em] uppercase mb-2">
            Kolica Gold
          </h1>
          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-sans">
            Fine Jewelry & Timepieces
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
              Email Address
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setUserError(""); }}
              placeholder="example@gmail.com"
              className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 rounded-none border-b font-sans text-sm focus:outline-none transition-colors ${
                userError ? "border-red-400 focus:border-red-500" : "border-[#D4AF37]/30 focus:border-[#4A0E17]"
              }`}
            />
            {userError && <p className="text-red-500 text-[11px] mt-1 font-sans">{userError}</p>}
          </div>

          
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans">
                Password
              </label>
              <a href="#" className="text-[10px] text-[#D4AF37] tracking-wider font-sans hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPassError(""); }}
              placeholder="••••••••"
              className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 rounded-none border-b font-sans text-sm focus:outline-none transition-colors ${
                passError ? "border-red-400 focus:border-red-500" : "border-[#D4AF37]/30 focus:border-[#4A0E17]"
              }`}
            />
            {passError && <p className="text-red-500 text-[11px] mt-1 font-sans">{passError}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#4A0E17] hover:bg-[#5C1620] text-[#FCFBF9] font-sans text-xs tracking-[0.25em] py-3.5 px-4 rounded-none uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              Enter Boutique
            </button>
          </div>
          
          {serverError && (
            <p className="text-red-500 text-center text-xs font-sans mt-2">
              {serverError}
            </p>
          )}

          
          <div className="border-t border-stone-100 pt-6 text-center">
            <p className="text-stone-400 text-[11px] tracking-widest font-sans uppercase">
              New client?{" "}
              <Link className="text-[#D4AF37] font-medium hover:text-[#4A0E17] ml-2 transition-colors duration-200" to="/Signup">
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}