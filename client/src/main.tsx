import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initEmailJS } from "./lib/emailService";

// Khởi tạo EmailJS
initEmailJS();

createRoot(document.getElementById("root")!).render(<App />);
