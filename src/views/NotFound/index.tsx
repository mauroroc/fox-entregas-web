import { Container } from "react-bootstrap";
import Layout from "../../components/Layout";

export function NotFoundView() {
  return (
    <Layout>
      <Container className="text-center my-5">
        <h1 className="mb-4">Página não encontrada</h1>
      </Container>
    </Layout>
  )
}