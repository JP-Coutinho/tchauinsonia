import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Screens
import Landing from "./screens/Landing.jsx";
import LoginPage from "./screens/Login.jsx";
import DashBoardPage from "./screens/DashBoard.jsx";
import FormularyPage from "./screens/InitialForms.jsx";
import ProfilePage from "./screens/Profile.jsx";
import DetailPage from "./screens/Detail.jsx";

export default function App() {
  return (
    <Router>
      <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Landing />} />       {/* Página Inicial */}
          <Route path="/login" element={<LoginPage />} />   {/* Página de Login */}
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/formulario" element={<FormularyPage /> } />
          <Route path="/detalhes" element={<DetailPage /> }  />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </>
    </Router>
  );
}
