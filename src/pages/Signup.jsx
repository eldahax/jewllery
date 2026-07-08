import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [serverError, setServerError] = useState("");

  const userregex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[A-Za-z]+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    setFirstNameError("");
    setLastNameError("");
    setUserError("");
    setPassError("");
    setConfirmError("");
    setServerError("");

    if (firstName.trim() === "") {
      setFirstNameError("First name is required");
      hasError = true;
    } else if (!nameRegex.test(firstName)) {
      setFirstNameError("First name can only contain letters");
      hasError = true;
    }

    if (lastName.trim() === "") {
      setLastNameError("Last name is required");
      hasError = true;
    } else if (!nameRegex.test(lastName)) {
      setLastNameError("Last name can only contain letters");
      hasError = true;
    }

    if (username.trim() === "") {
      setUserError("Please enter an email address");
      hasError = true;
    } else if (!userregex.test(username)) {
      setUserError("Please enter a valid email address");
      hasError = true;
    }

    if (password.trim() === "") {
      setPassError("Please create a password");
      hasError = true;
    } else if (!passRegex.test(password)) {
      setPassError(
        "Must contain uppercase, lowercase, number, symbol (8-20 characters)"
      );
      hasError = true;
    }

    if (confirmPassword.trim() === "") {
      setConfirmError("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: username,
          password: password,
          phone: phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Registration failed");
        return;
      }

      navigate("/login");

    } catch (err) {
      setServerError("Could not connect to the boutique server.");
    }
  };


  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-[#FCFBF9] font-serif p-4 md:p-8">
      
      <div className="w-full max-w-xl p-6 sm:p-10 bg-white border border-[#D4AF37]/30 shadow-[0_15px_40px_rgba(74,14,23,0.05)] rounded-none">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-[#4A0E17] tracking-[0.35em] uppercase mb-2">
            Kolica Gold
          </h1>

          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase font-sans">
            Create Client Profile
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-5">


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e)=>{
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
                placeholder="Alexander"
                className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b font-sans text-sm focus:outline-none ${
                  firstNameError ? "border-red-400" : "border-[#D4AF37]/30"
                }`}
              />

              {firstNameError &&
                <p className="text-red-500 text-[11px] mt-1 font-sans">
                  {firstNameError}
                </p>
              }
            </div>


            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
                Last Name
              </label>

              <input
                type="text"
                value={lastName}
                onChange={(e)=>{
                  setLastName(e.target.value);
                  setLastNameError("");
                }}
                placeholder="Vance"
                className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b font-sans text-sm focus:outline-none ${
                  lastNameError ? "border-red-400" : "border-[#D4AF37]/30"
                }`}
              />

              {lastNameError &&
                <p className="text-red-500 text-[11px] mt-1 font-sans">
                  {lastNameError}
                </p>
              }
            </div>

          </div>


          <div className="flex flex-col">

            <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
              Email Address
            </label>

            <input
              type="text"
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value);
                setUserError("");
              }}
              placeholder="example@gmail.com"
              className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b font-sans text-sm focus:outline-none ${
                userError ? "border-red-400" : "border-[#D4AF37]/30"
              }`}
            />

            {userError &&
              <p className="text-red-500 text-[11px] mt-1 font-sans">
                {userError}
              </p>
            }

          </div>



          <div className="flex flex-col">

            <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
              Phone Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b border-[#D4AF37]/30 font-sans text-sm focus:outline-none"
            />

          </div>



          <div className="flex flex-col">

            <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
              Create Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
                setPassError("");
              }}
              placeholder="••••••••"
              className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b font-sans text-sm focus:outline-none ${
                passError ? "border-red-400" : "border-[#D4AF37]/30"
              }`}
            />

            {passError &&
              <p className="text-red-500 text-[11px] mt-1 font-sans">
                {passError}
              </p>
            }

          </div>




          <div className="flex flex-col">

            <label className="text-[10px] uppercase tracking-[0.2em] text-[#4A0E17]/70 font-sans mb-1.5">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=>{
                setConfirmPassword(e.target.value);
                setConfirmError("");
              }}
              placeholder="••••••••"
              className={`bg-transparent text-stone-800 placeholder-stone-300 px-3 py-2.5 border-b font-sans text-sm focus:outline-none ${
                confirmError ? "border-red-400" : "border-[#D4AF37]/30"
              }`}
            />

            {confirmError &&
              <p className="text-red-500 text-[11px] mt-1 font-sans">
                {confirmError}
              </p>
            }

          </div>




          <button
            type="submit"
            className="w-full bg-[#4A0E17] hover:bg-[#5C1620] text-[#FCFBF9] font-sans text-xs tracking-[0.25em] py-3.5 uppercase transition-all"
          >
            Register Profile
          </button>


          {serverError &&
            <p className="text-red-500 text-center text-xs font-sans">
              {serverError}
            </p>
          }



          <div className="border-t border-stone-100 pt-6 text-center">

            <p className="text-stone-400 text-[11px] tracking-widest font-sans uppercase">

              Already Registered?

              <Link
                className="text-[#D4AF37] font-medium hover:text-[#4A0E17] ml-2"
                to="/login"
              >
                Sign In
              </Link>

            </p>

          </div>


        </form>

      </div>

    </div>
  );
}