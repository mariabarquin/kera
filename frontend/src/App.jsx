import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Protege rutas solo para administradores: el resto vuelve a la home
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return isAdmin ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      {/* Banner promocional y Header unificados globalmente */}
      <Banner />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;