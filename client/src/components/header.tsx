import { useState } from "react";
import { WhatsAppLogo } from "./ui/whatsapp-logo";
import { Link } from "wouter";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-whatsapp-green text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <WhatsAppLogo className="w-7 h-7 text-whatsapp-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold">WhatsApp</h1>
                <p className="text-xs opacity-75">Tuyển dụng - Gia nhập đội ngũ chuyên nghiệp</p>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#gioi-thieu" className="hover:text-whatsapp-light transition">Giới thiệu</a></li>
              <li><a href="#vi-tri" className="hover:text-whatsapp-light transition">Vị trí tuyển dụng</a></li>
              <li><a href="#lien-he" className="hover:text-whatsapp-light transition">Liên hệ</a></li>
            </ul>
          </nav>
          
          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <ul className="space-y-2">
              <li>
                <a 
                  href="#gioi-thieu" 
                  className="block py-2 hover:text-whatsapp-light transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a 
                  href="#vi-tri" 
                  className="block py-2 hover:text-whatsapp-light transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vị trí tuyển dụng
                </a>
              </li>
              <li>
                <a 
                  href="#lien-he" 
                  className="block py-2 hover:text-whatsapp-light transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
