import { Container, Nav, Navbar } from "react-bootstrap";
import Button from "../Button";
import LogoWhite from "../../assets/img/logo-fox-entregas-white.svg"
import LogoBlue from "../../assets/img/logo-fox-entregas-blue.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, selectIsUserLoggedIn } from "../../store/slices/userSlices";
import { logoutUser } from "../../services/logoutUser";
import { toast } from "react-toastify";

type Props = {
  startTransparent?: boolean
}
export default function Header({startTransparent = false}: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  const [isTransparent, setIsTransparent] = useState(startTransparent)
  useEffect(() => {
    const handleScrollChange = () => {
      if (window.scrollY < 60) {
        setIsTransparent(true)
      } else {
        setIsTransparent(false)
      }
    }
    if (startTransparent) {
      window.addEventListener('scroll', handleScrollChange)
      const clearEvent = () => {
        window.removeEventListener('scroll', handleScrollChange)
      }
      return clearEvent
    }
  }, [startTransparent])
  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(deleteUser())
      navigate('/login')
    } catch {
      toast.error('Falha ao sair')
    }    
  }
  return (
    <NavbarStyled fixed='top' expand='lg' bg={isTransparent ? undefined : 'white'}>
      <Container>
        <NavbarBrandStyled to="/" as={Link}>
          <LogoStyled src={isTransparent ? LogoWhite : LogoBlue} alt="Logo Fox Entregas" width={194} height={51} />  
        </NavbarBrandStyled>
        <Navbar.Toggle aria-controls='menu-header' className="border-0">
          <FontAwesomeIcon icon={faBars} size="lg" className={isTransparent ? 'text-white' : 'text-dark'} />
        </Navbar.Toggle>
        <NavBarCollapseStyled id='menu-header'>
          <Nav className="text-center align-items-center ms-auto">
            <NavLinkStyled forwardedAs={Link} to="/" $isTransparent={isTransparent}>Inicio</NavLinkStyled>
            {isUserLoggedIn ? (
              <>
                <Button to="/novo-pedido" className="mt-2 mt-lg-0 ms-lg-4">Novo Pedido</Button>
                <Button onClick={handleLogout} className="mt-2 mt-lg-0 ms-lg-4">Sair</Button>
              </>
            ) : (
              <>
                <Button to="/cadastro" className="mt-2 mt-lg-0 ms-lg-4">Criar Conta</Button>
                <Button to="/login" className="mt-2 mt-lg-0 ms-lg-4">Fazer Login</Button>
              </>
          )}
          </Nav>
        </NavBarCollapseStyled>
      </Container>
    </NavbarStyled>
  )
}

const NavbarStyled = styled(Navbar)`
padding: 0;
${props => props.bg === 'white' && `
  box-shadow: 0px 2px 4px rgba(0,0,0,0.25);
`}
`

const NavbarBrandStyled = styled(Navbar.Brand)`
  padding: 10px 0;
`

const LogoStyled = styled.img`
  @media (min-width: 992px) {
    width: 266px;
    height: auto;
  }
`

const NavBarCollapseStyled = styled(Navbar.Collapse)`
  @media (max-width: 991px) {
    background: #FFF;
    margin: 0 -0.75rem;
    padding: 0 0 1rem;
  } 
`

const NavLinkStyled = styled(Nav.Link)`
  color: #000 !important;
  @media (min-width: 992px) {
    color: ${props => props.$isTransparent ? '#FFF' : '#000'} !important;
  }
`