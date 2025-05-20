// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
