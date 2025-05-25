import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import { useLocation } from "react-router-dom";
import Profile from "../components/Profile/profile";

export default function ProfilePage() {
  const location = useLocation();
  const user = location.state?.user; // Aqui, 'user' contém as propriedades serializáveis
  console.log(user);
    
  // Verifica se o user está disponível antes de acessar as propriedades
  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <>
      <TopNavbar />
      <Profile />
    </>
  );
}