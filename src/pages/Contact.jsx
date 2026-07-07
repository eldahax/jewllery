import React, { useState } from "react";
import NavBar from "../components/nav";
import Footer from "../components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    
    <div className="w-full  min-h-screen text-[#1A080B] font-sans antialiased">
      <NavBar></NavBar>
      <section className="w-full h-[700px] relative bg-gray-300 overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" 
          alt="Get in touch banner" 
          className="w-full h-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <h1 className="text-white text-xs md:text-sm tracking-[0.4em] uppercase font-light">
            Get In Touch
          </h1>
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center">
        
        <p className="text-[11px] text-[#1A080B]/60 tracking-wide text-center mb-8">
          Have questions? We may have your answer in our{" "}
          <a href="#faq" className="underline underline-offset-2 hover:text-black">
            FAQ section -- Take a quick look here!
          </a>
        </p>

        <h2 className="font-serif text-2xl md:text-3xl text-center tracking-wide leading-snug max-w-2xl uppercase mb-16 text-[#2A2421]">
          Contact us via the form below & we'll get back to your as soon as we can.
        </h2>

        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
          
          <div className="w-full md:w-[35%] flex flex-col gap-8 text-[15px] tracking-widest uppercase text-[#2A2421]">
            
            <div>
              <span className="font-semibold block mb-1">Email</span>
              <a href="mailto:info@yourwebsite.com" className="text-[#1A080B]/60 lowercase tracking-normal hover:underline">
                info@yourwebsite.com
              </a>
            </div>

            <div>
              <span className="font-semibold block mb-1">Phone</span>
              <span className="text-[#1A080B]/60 tracking-normal">(000) 000-0000</span>
            </div>

            <div>
              <span className="font-semibold block mb-1">Address</span>
              <p className="text-[#1A080B]/60 normal-case tracking-normal leading-relaxed">
                1234 Street Address <br />
                City, State, 12345
              </p>
            </div>

            <div>
              <span className="font-semibold block mb-2">Social</span>
              <div className="flex gap-4 text-xs text-[#1A080B]/70">
                <a href="#instagram" className="hover:text-black">IG</a>
                <a href="#facebook" className="hover:text-black">FB</a>
                <a href="#twitter" className="hover:text-black">TW</a>
                <a href="#linkedin" className="hover:text-black">LN</a>
              </div>
            </div>

          </div>

          <div className="hidden md:block w-[1px] h-[350px] bg-[#1A080B]/10 self-center mx-4" />

          <form onSubmit={handleSubmit} className="w-full md:w-[55%] flex flex-col gap-4">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase text-[#1A080B]/50 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full  border border-[#1A080B]/10 px-4 py-3 text-sm focus:outline-none focus:border-[#1A080B]/40 transition"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase text-[#1A080B]/50 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full  border border-[#1A080B]/10 px-4 py-3 text-sm focus:outline-none focus:border-[#1A080B]/40 transition"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase text-[#1A080B]/50 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full  border border-[#1A080B]/10 px-4 py-3 text-sm focus:outline-none focus:border-[#1A080B]/40 transition"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase text-[#1A080B]/50 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full  border border-[#1A080B]/10 px-4 py-3 text-sm focus:outline-none focus:border-[#1A080B]/40 transition "
                required
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-[#C4B7A6] text-white text-[11px] tracking-[0.25em] uppercase px-10 py-3.5 rounded-full hover:bg-[#A39482] transition duration-300 shadow-sm cursor-pointer"
              >
                Submit
              </button>
            </div>

          </form>

        </div>

      </section>
<Footer></Footer>
    </div>
  );
}