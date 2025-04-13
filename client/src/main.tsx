import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import emailjs from '@emailjs/browser';

// Khởi tạo EmailJS với public key thật sự (không phải placeholder)
emailjs.init("f3HwCGz2s_dyKkto-");
console.log("EmailJS đã được khởi tạo với public key trực tiếp");

createRoot(document.getElementById("root")!).render(<App />);
