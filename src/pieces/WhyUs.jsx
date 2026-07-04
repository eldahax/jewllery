import React from "react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "Rings",
      desc: "Created beyond trends, made to endure.",
    },
    {
      title: "Earrings",
      desc: "Only carefully selected metals and finishes.",
    },
    {
      title: "Necklaces",
      desc: "Every piece refined by skilled hands.",
    },
    {
      title: "Bracelets",
      desc: "Understated, intentional, personal.",
    },
  ];

  return (
    <section className="w-full bg-[#FAF8F5] px-6 md:px-20 py-28 flex flex-col md:flex-row gap-16 justify-between items-start max-w-[1400px] mx-auto">
      
      {/* Left Side: Editorial Heading */}
      <div className="flex flex-col">
        <h2 className="font-serif text-[60px] md:text-[85px] uppercase text-[#D1C7BD] tracking-wider leading-[0.85] font-normal select-none">
          Why <br /> Us
        </h2>
      </div>

      {/* Right Side: Luxury Minimalist List */}
      <div className="w-full md:w-[500px] flex flex-col">
        {points.map((item, i) => (
          <div
            key={i}
            className="w-full flex justify-between items-start py-6 border-b border-[#1A080B]/10 group cursor-pointer transition-all duration-300 hover:border-[#1A080B]"
          >
            {/* Title and Description */}
            <div className="flex flex-col gap-1.5 max-w-[80%]">
              <h3 className="text-[14px] uppercase tracking-[0.25em] font-medium text-[#1A080B]">
                {item.title}
              </h3>
              <p className="text-[12px] text-[#4A4540]/60 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Arrow Element on the right side */}
            <span className="text-sm text-[#1A080B]/40 transform group-hover:translate-x-1 transition-transform duration-300 md:pt-1">
              →
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}