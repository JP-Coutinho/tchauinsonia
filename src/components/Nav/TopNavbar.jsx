import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";
import NotificationIcon from "../../assets/svg/NotificationIcon"; 
import { auth } from "../../firebase";  
import { signOut } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const navigate = useNavigate();
  const [sidebarOpen, toggleSidebar] = useState(false);
  const [user, setUser] = useState(null); 
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // Estado para controle do menu do usuário

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); 
    });

    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      unsubscribe(); 
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log("Usuário desconectado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao desconectar:", error);
    }
  };

  const handleFormRedirect = () => {
    const {displayName, email, photoURL, uid } = user;
    setNotificationOpen(false); // Fecha o menu de notificação
    navigate("/formulario",  { state: { user: { displayName, email, photoURL, uid } } }); // Redireciona para a rota do formulário
  };



  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleUserDropdownToggle = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleNavigation = (route) => {
    if (user) {
      const { displayName, email } = user;
      navigate(route, { state: { user: { displayName, email } } });
    }
    setUserDropdownOpen(false); // Fecha o menu do usuário
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              Tchau Insônia
            </h1>
          </Link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Serviços
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Casos de sucesso
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Planos
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contato
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {!user ? (
              <>
                <li className="semiBold font15 pointer">
                  <a href="/login" style={{ padding: "10px 30px 10px 0" }}>
                    Entrar
                  </a>
                </li>
                <li className="semiBold font15 pointer flexCenter">
                  <a href="/" className="radius8 lightBg" style={{ padding: "10px 15px" }}>
                    Começar agora
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="semiBold font15 pointer" onClick={handleUserDropdownToggle} style={{ position: "relative" }}>
                  <span className="radius8 lightBg" style={{ padding: "10px 15px", marginRight: "10px" }}>
                    Olá, {user.displayName}!
                  </span>
                  {userDropdownOpen && (
                    <UserDropdown>
                      <DropdownItem onClick={() => handleNavigation("/dashboard")}>Dashboard</DropdownItem>
                      <DropdownItem onClick={() => handleNavigation("/")}>Home</DropdownItem>
                      <DropdownItem onClick={() => handleNavigation("/perfil")}>Meu Plano</DropdownItem>
                      <DropdownItem onClick={() => handleNavigation("/detalhes")}>Meu Perfil</DropdownItem>
                      <DropdownItem onClick={() => handleNavigation("/sala-bem-estar")}>Bem Estar</DropdownItem>
                    </UserDropdown>
                  )}
                </li>
                <li className="semiBold font15 pointer flexCenter">
                  <a className="radius8 lightBg" style={{ padding: "10px 15px" }} onClick={handleLogout}>
                    Sair
                  </a>
                </li>
                {/* Ícone de Notificação */}
                <li className="semiBold font15 pointer flexCenter" style={{ position: "relative" }}>
                  <NotificationIcon onClick={handleNotificationClick} style={{ cursor: "pointer", marginLeft: "10px" }} />
                  {notificationOpen && (
                    <NotificationMenu>
                      <p>Você precisa responder a um formulário.</p>
                      <button onClick={handleFormRedirect}>Ir para o formulário</button>
                    </NotificationMenu>
                  )}
                </li>
              </>
            )}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;

// Estilos para o menu de notificação
const NotificationMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  width: 200px;

  p {
    margin: 0 0 10px 0;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Estilos para o menu do usuário
const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;
