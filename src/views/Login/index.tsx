import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { getFieldProps } from "../../utils/getFieldProps";
import * as yup from 'yup'
import { CredentialsInput, loginUser } from "../../services/loginUser";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { toast } from "react-toastify";

type FormValues = CredentialsInput

export default function LoginView() {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Informe seu e-mail').email('Informe um e-mail válido'),
      password: yup.string().required('Informe a senha')
    }),
    onSubmit: async (values) => {
      try {
        await loginUser(values)        
      } catch (error) {
        const errorMsg = 
          error instanceof FirebaseError &&
          (error.code === AuthErrorCodes.INVALID_PASSWORD ||
           error.code === AuthErrorCodes.USER_DELETED)
          ? 'Login ou senha inválido'
          : 'Falha ao fazer login. Tente novamente.'
        toast.error(errorMsg)
      }     
    }
  })
  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4}>
            <PageTitle>Login</PageTitle>
            <Form onSubmit={formik.handleSubmit}>
            <FormField 
                {... getFieldProps<FormValues>(formik, 'email', 'E-mail', 'Informe seu e-mail')}                
              />
              <FormField
                {... getFieldProps<FormValues>(formik, 'password', 'Senha', 'Informe sua senha de acesso')}                          
                type="password"
              />
              <div className="d-grid mb-4">
                <Button type="submit" loading={formik.isValidating || formik.isSubmitting} disabled={formik.isValidating || formik.isSubmitting}>
                  Entrar
                </Button>
            </div>
            </Form>
            <p className="text-center">Não possui conta? <Link to="/cadastro" className="d-block">Cadastrar</Link></p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}