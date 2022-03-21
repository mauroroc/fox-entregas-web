import { Col, Container, Form, Row } from "react-bootstrap";
import FormField from "../../components/FormField";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";

export function RegisterView() {
  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4}>
            <PageTitle>Nova Conta</PageTitle>
            <FormField 
              label='Nome'
              placeholder="Informe seu nome"
              control-id="input-name"
            />
            <FormField 
              label='E-mail'
              placeholder="Informe seu e-mail"
              control-id="input-email"
            />
            <FormField 
              label='Telefone'
              placeholder="Informe seu telefone"
              control-id="input-phone"
              mask={[
                { mask: '(00) 0000-0000' },
                { mask: '(00) 00000-0000' }
              ]}          
            />
            <FormField 
              label='Senha'
              placeholder="Informe sua senha de acesso"
              control-id="input-password"
            />
            <Form.Group className="mb-3" controlId="input-agree">
              <Form.Check type="checkbox" label={<span>Eu li e aceito os <a href="/termos-de-uso.pdf" target="_blank">termos de uso</a></span>}/>
            </Form.Group>
          </Col>
        </Row>
       
      </Container>      
    </Layout>
  )
}