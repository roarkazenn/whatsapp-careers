import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import emailjs from '@emailjs/browser';

// Khởi tạo EmailJS với public key thật sự (không phải placeholder)
emailjs.init("${EMAILJS_PUBLIC_KEY}");

createRoot(document.getElementById("root")!).render(<App />);
