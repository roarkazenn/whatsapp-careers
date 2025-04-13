import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import emailjs from '@emailjs/browser';
import { initEmailJS } from "./lib/emailService";

// Khởi tạo EmailJS
initEmailJS();

// Hiển thị console để gỡ lỗi
emailjs.init("f3HwCGz2s_dyKkto-"); // Đảm bảo key PUBLIC_KEY được khởi tạo
console.log("EmailJS đã được khởi tạo với public key:f3HwCGz2s_dyKkto-");

createRoot(document.getElementById("root")!).render(<App />);
