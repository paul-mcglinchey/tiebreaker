import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Userfront from "@userfront/core";
import { IconWrapper } from '.';
import { StyledField, SubmitButton } from '..';

Userfront.init("wn9p69b5");

const PasswordResetRequest = () => {

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (values: { email: string }) => {

    setError('');

    Userfront.sendResetLink(
      values.email
    )
      .then((res) => {
        if (res.result) {
          setMessage("Request sent");
        }
      })
      .catch((error) => {
        setError(error.message);
      })
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
                  <SubmitButton content="Request password reset" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {error && (
          <div className="mt-10 flex border-2 border-red-500 text-red-500 p-2 justify-center rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mt-10 flex border-2 border-green-500 text-green-500 p-2 justify-center rounded">
            {message}
          </div>
        )}
      </div>
    </IconWrapper>
  )
}

export default PasswordResetRequest;