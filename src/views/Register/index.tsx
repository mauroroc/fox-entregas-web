import { Formik, useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import * as yup from 'yup';

type FormValues = {
  name: string
  email: string
  phone: string
  password: string
  agree: boolean
}

export function RegisterView() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name:'',
      email:'',
      phone:'',
      password:'',
      agree:false
    }, validationSchema: yup.object().shape({
      name: yup.string()
        .required('Preencha o nome')
        .min(3, 'Informe pelo menos 3 caracteres'),
      email: yup.string()
        .required('Preencha o e-mail')
        .email('O e-mail precisa ser válido'),
      phone: yup.string()
        .required('Preencha o telefone'),
      password: yup.string()
        .required('Preencha a senha'),
      agree: yup.boolean()
        .equals([true],'É obrigatorio aceitar os termos.')
    }),
      onSubmit: (values) => {
      console.log(values)
    }
  })
  const getFieldProps = (fieldName: keyof FormValues, label: string, placeholder: string) => ({
    ...formik.getFieldProps(fieldName),
    controlId: `input-${fieldName}`,
    label,
    placeholder,
    isInvalid: formik.touched[fieldName] &&!!formik.errors[fieldName],
    error: formik.errors[fieldName]
  })
  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4}>
            <PageTitle>Nova Conta</PageTitle>
            <Form onSubmit={formik.handleSubmit}>            
              <FormField   
                {... getFieldProps('name', 'Nome', 'Informe seu nome')}                            
              />
              <FormField 
                {... getFieldProps('email', 'E-mail', 'Informe seu e-mail')}                
              />
              <FormField 
                {... getFieldProps('phone', 'Telefone', 'Informe seu telefone')}                
                mask={[
                  { mask: '(00) 0000-0000' },
                  { mask: '(00) 00000-0000' }
                ]}  
                onAccept={(value)=> formik.setFieldValue('phone', value)}        
              />
              <FormField
                {... getFieldProps('password', 'Senha', 'Informe sua senha de acesso')}                          
                type="password"
              />
              <Form.Group className="mb-3" controlId="input-agree">
                <Form.Check 
                  {... formik.getFieldProps('agree')}
                  type="checkbox" 
                  label={<span>Eu li e aceito os <a href="/termos-de-uso.pdf" 
                  target="_blank">termos de uso</a></span>}/>
                <Form.Control.Feedback type="invalid" className={formik.errors.agree ? 'd-block' : undefined}>
                  {formik.touched.agree && formik.errors.agree}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid mb-4">
                <Button type="submit">
                  Criar Conta
                </Button>
            </div>
            </Form>            
            <p className="text-center">Já possui conta? <Link to="/login" className="d-block">Entrar</Link></p>
          </Col>
        </Row>
      </Container>      
    </Layout>
  )
}