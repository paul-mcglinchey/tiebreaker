import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginValidationSchema } from '../../schema';
import { useAuthService } from '../../hooks';
import { IUser } from '../../models';
import { StyledField, Button } from '.';
import PublicWrapper from './PublicWrapper';

const Login = () => {

  const { login } = useAuthService();

  const handleSubmit = (user: IUser) => {
    login(user)
  }

  return (
    <PublicWrapper>
      <Formik
        initialValues={{
          emailOrUsername: '',
          password: ''
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          handleSubmit({ email: values.emailOrUsername, username: values.emailOrUsername, password: values.password });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col space-y-4">
              <div className="flex-col space-y-2">
                <StyledField name="emailOrUsername" label="Email or Username" errors={errors.emailOrUsername} touched={touched.emailOrUsername} />
                <StyledField name="password" type="password" label="Password" errors={errors.password} touched={touched.password} />
              </div>
              <div className="flex justify-between">
                <Link to='/signup' className="px-4 py-2 font-bold filter drop-shadow-none shadow-none transition-all dark:text-gray-600 dark:hover:text-gray-400">
                  Sign Up
                </Link>
                <Button content="Login" />
              </div>
              <div className="flex justify-center">
                <Link to='/passwordresetrequest' className="font-bold transition-all px-4 py-2 mt-10 dark:text-gray-600 dark:hover:text-gray-400">
                  Forgot password?
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PublicWrapper>
  )
}

export default Login;