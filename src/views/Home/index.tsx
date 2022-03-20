import styled from "styled-components"
import bgMobile from "../../assets/img/bg-fox-entregas-mobile.png"
import bgDesktop from "../../assets/img/bg-fox-entregas-desktop.png"
import { Container } from "react-bootstrap"
import Button from "../../components/Button"
import Layout from "../../components/Layout"

export default function HomeView() {
  return (
    <Layout>
      <Banner className="vh-100">
        <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
          <Title className="text-white text-center text-lg-start mt-auto">Fazemos sua entrega de forma rápida e barata</Title>
          <Button variant="success" className="mb-2 mt-auto">Criar Conta</Button>
          <Button variant="success" className="mb-4">Fazer Login</Button>
        </Container>
      </Banner>
    </Layout>
  )
}

const Banner = styled.div`
  background: url(${bgMobile}) no-repeat center center;
  background-size: cover;
  padding-top: 71px;
  @media (min-width: 576px) {
    background-image: url(${bgDesktop});
  }
  @media (min-width: 768px) {
    background-image: url(${bgMobile});
  }
  @media (min-width: 992px) {
    background-image: url(${bgDesktop});
  }
`

const Title = styled.h1`
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 36px;
  @media (min-width: 992px) {
    font-size: 48px;
    max-width: 500px;
  }
`