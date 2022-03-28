import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FormField from "../../components/FormField";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import * as yup from 'yup';
import { createUser } from "../../services/createUser";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { toast } from "react-toastify";
import { updateUser } from "../../store/slices/userSlices";
import { useDispatch } from "react-redux";
import { getFieldProps } from "../../utils/getFieldProps";

type FormValues = {
  name: string
  email: string
  phone: string
  password: string
  agree: boolean
}

export function RegisterView() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      onSubmit: async (values) => {
      try {
        const user = await createUser(values)
        const action = updateUser(user)
        dispatch(action)
        navigate('/novo-pedido')
      } catch (error) {
        if (error instanceof FirebaseError && error.code === AuthErrorCodes.EMAIL_EXISTS) {
          formik.setFieldError('email', 'Este e-mail já está em uso')
          return
        }       
        toast.error('Ocorreu um erro ao cadastrar. Tente novamente!') 
      }
    }
  })
  
  return (
    <Layout>
      <Container>
        <Row className="justify-content-center">
          <Col lg={4}>
            <PageTitle>Nova Conta</PageTitle>
            <Form onSubmit={formik.handleSubmit}>            
              <FormField   
                {... getFieldProps<FormValues>(formik, 'name', 'Nome', 'Informe seu nome')}                            
              />
              <FormField 
                {... getFieldProps<FormValues>(formik, 'email', 'E-mail', 'Informe seu e-mail')}                
              />
              <FormField 
                {... getFieldProps<FormValues>(formik, 'phone', 'Telefone', 'Informe seu telefone')}                
                mask={[
                  { mask: '(00) 0000-0000' },
                  { mask: '(00) 00000-0000' }
                ]}  
                onAccept={(value)=> formik.setFieldValue('phone', value)}        
              />
              <FormField
                {... getFieldProps<FormValues>(formik, 'password', 'Senha', 'Informe sua senha de acesso')}                          
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
                <Button type="submit" loading={formik.isValidating || formik.isSubmitting} disabled={formik.isValidating || formik.isSubmitting}>
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