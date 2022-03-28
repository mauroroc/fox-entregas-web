import { Container, Nav } from "react-bootstrap"
import LogoWhite from "../../assets/img/logo-fox-entregas-white.svg"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsUserLoggedIn } from "../../store/slices/userSlices"

type Props = {
  withoutMargin?: boolean
}

export default function Footer({withoutMargin = false}: Props) {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn)
  return (
    <FooterStyled className={`text-center pt-4 pb-5 py-lg-3 ${withoutMargin ? '' : 'mt-5'}`}>
      <Container className="d-lg-flex align-items-center">
        <Link to="/">
          <LogoStyled src={LogoWhite} alt="Logo Fox Entregas" width={255} height={67} />
        </Link>
        <Nav className="flex-column flex-lg-row my-4 my-lg-0 ms-auto">
          <Nav.Link to="/" as={Link} className="text-white">Inicio</Nav.Link>
          {isUserLoggedIn ? (              
                <Nav.Link to="/novo-pedido" as={Link} className="text-white">Novo Pedido</Nav.Link>                              
            ) : (
              <>
                 <Nav.Link to="/cadastro" as={Link} className="text-white">Cadastro</Nav.Link>
                 <Nav.Link to="/login" as={Link} className="text-white">Login</Nav.Link>
              </>
          )}
          
          <Nav.Link href="/termos-de-uso.pdf" target="_blank" className="text-white">Termos de Uso</Nav.Link>
        </Nav>
        <Nav className="justify-content-center">
          <Nav.Link href="https://facebook.com" target="_blank" rel='noreferrer noopener' className="py-0 px-2">
            <IconStyled icon={faFacebookSquare} className="text-white"/>  
          </Nav.Link>
          <Nav.Link href="https://instagram.com" target="_blank" rel='noreferrer noopener' className="py-0 px-2">
            <IconStyled icon={faInstagram} className="text-white"/>  
          </Nav.Link>
        </Nav>
      </Container>
    </FooterStyled>
  )
}

const LogoStyled = styled.img`
  @media(min-width: 992px) {
    width: 190px;    
  }
`

const FooterStyled = styled.footer`
  background-color: #414141;
`

const IconStyled = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
`