import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { StyledField, Button, IconWrapper } from '..';

const PasswordResetRequest = () => {

  const handleSubmit = (values: { email: string }) => {
    console.log(values)
  }

  return (
    <IconWrapper>
      <div className="absolute top-1/4 rounded w-full p-4 filter drop-shadow-sm">
        <Formik
          initialValues={{
            email: ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="email" label="Email" errors={errors.email} touched={touched.email} />
                </div>
                <div className="flex justify-between">
                  <Link to='/login'>
                    <button type="button" className="px-4 py-2 font-bold text-gray-500 hover:text-gray-300 transition-all">
                      Cancel
                    </button>
                  </Link>
                  <Button content="Request password reset" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </IconWrapper>
  )
}

export default PasswordResetRequest;