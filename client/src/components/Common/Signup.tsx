import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { signupValidationSchema } from '../../schema';
import { IUser } from '../../models';
import { useAuth } from '../../hooks';
import { StyledField, Button } from '.';
import PublicWrapper from './PublicWrapper';

const Signup = () => {
  const { signup } = useAuth();

  const handleSubmit = (user: IUser) => {
    signup(user);
  }

  return (
    <PublicWrapper>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: ''
        }}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex flex-col space-y-4">
              <div className="flex-col space-y-2">
                <StyledField name="email" label="Email" errors={errors.email} touched={touched.email} />
                <StyledField name="username" label="Username" errors={errors.username} touched={touched.username} />
                <StyledField name="password" type="password" label="Password" errors={errors.password} touched={touched.password} />
              </div>
              <div className="flex flex-grow justify-end">
                <Button content="Sign up" />
              </div>
              <div className="flex justify-center">
                <Link to='/login' className='mt-10'>
                  <button type="button" className="font-bold text-gray-500 hover:text-gray-300 transition-all px-4 py-2">
                    Already a user?
                  </button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PublicWrapper>
  )
}

export default Signup;