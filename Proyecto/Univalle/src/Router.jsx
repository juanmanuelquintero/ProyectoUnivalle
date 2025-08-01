import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginAdmin from "./Adminlogin";
import PaginaAdmin from "./PaginaAdmin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pagina1" element={<App />} />
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/PaginaAdmin" element={<PaginaAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
