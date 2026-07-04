import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <>
            <footer className="bg-[#1A080B] text-[#FCFBF9]/80 py-16 px-6 md:px-12 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 border-b border-white/10 pb-12">
          
          <div className="space-y-4">
            <h4 className="text-lg font-bold tracking-[0.3em] uppercase text-white">KOLICA</h4>
            <p className="text-[11px] text-white/50 leading-relaxed max-w-xs font-serif italic">
              Get raw layout updates, collections, and exclusive drops straight to your portal.
            </p>
            <div className="flex border-b border-white/20 pb-1 max-w-xs focus-within:border-white transition-colors">
              <input type="email" placeholder="Email Address" className="bg-transparent w-full focus:outline-none text-xs placeholder-white/30 text-white font-sans" />
              <button className="text-white text-[10px] tracking-widest uppercase pl-2 font-bold hover:text-[#D4AF37] transition-colors">Join</button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-[11px] tracking-wider uppercase font-sans text-white/60">
            <Link to="/Shop" className="text-white font-bold tracking-widest text-xs mb-2 block">Shop</Link>
            <Link to="/Shop" className="hover:text-white transition-colors">Shop All</Link>
            <Link  className="hover:text-white transition-colors">Rings</Link>
            <Link className="hover:text-white transition-colors">Earrings</Link>
            <Link className="hover:text-white transition-colors"> Necklaces</Link>
          </div>

          <div className="flex flex-col space-y-2 text-[11px] tracking-wider uppercase font-sans text-white/60">
            <span className="text-white font-bold tracking-widest text-xs mb-2 block">Collections</span>
            <a href="" className="hover:text-white transition-colors">Crushed Gold Collection</a>
            <a href="" className="hover:text-white transition-colors">La Concha Edition</a>
            <a href="" className="hover:text-white transition-colors">Lost Gems</a>
          </div>

          <div className="flex flex-col space-y-2 text-[11px] tracking-wider uppercase font-sans text-white/60">
            <span className="text-white font-bold tracking-widest text-xs mb-2 block">Services</span>
            <a  className="hover:text-white transition-colors">Shipping & Returns</a>
            <a  className="hover:text-white transition-colors">Sizing Guides</a>
            <a className="hover:text-white transition-colors">Product Care</a>
            <a  className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/30 tracking-widest uppercase gap-4">
          <p>© 2026 KOLICA-GOLD MAISON. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a  className="hover:text-white transition-colors">Privacy Policy</a>
            <a  className="hover:text-white transition-colors">Terms of Sale</a>
            <a  className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
</>
    )
}