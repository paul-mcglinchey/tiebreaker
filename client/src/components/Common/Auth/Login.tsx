import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { StyledField, Button, IconWrapper } from '..';
import { loginValidationSchema } from '../../../utilities';
import { useAuth } from '../../../hooks';
import { IUser } from '../../../models';

const Login = () => {

  const { login } = useAuth();

  const handleSubmit = (user: IUser) => {
    login(user)
  }

  return (
    <IconWrapper>
      <div className="absolute top-32 rounded w-full p-4 filter drop-shadow-sm">
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
                  <Link to='/signup'>
                    <button type="button" className="px-4 py-2 font-bold text-gray-500 hover:text-gray-300 filter drop-shadow-none shadow-none transition-all">
                      Sign Up
                    </button>
                  </Link>
                  <Button content="Login"/>
                </div>
                <div className="flex justify-center">
                  <Link to='/passwordresetrequest'>
                    <button type="button" className="font-bold text-gray-500 hover:text-gray-300 transition-all px-4 py-2 mt-10">
                      Forgot password?
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </IconWrapper>
  )
}

export default Login;