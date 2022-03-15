import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import Userfront from "@userfront/core";
import { Transition } from "@headlessui/react";

import { IconWrapper } from '.';
import { StyledField, SubmitButton } from '../..';
import { signupValidationSchema } from '../../../utilities';


Userfront.init("wn9p69b5");

const Signup = () => {

  const [error, setError] = useState('');

  const handleSubmit = (values: { email: string, username: string, password: string }) => {

    setError('');

    Userfront.signup({
      method: "password",
      email: values.email,
      username: values.username,
      password: values.password
    })
      .catch((error) => {
        setError(error.message);
      })
  }

  return (
    <IconWrapper>
      <div className="absolute top-32 rounded w-full p-4 filter drop-shadow-sm">
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
                  <SubmitButton content="Sign up" />
                </div>
                <div className="flex justify-center">
                  <Link to='/login'>
                    <button type="button" className="font-bold text-gray-500 hover:text-gray-300 transition-all px-4 py-2 mt-10">
                      Already a user?
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Transition
          show={error ? true : false}
          enter="transition ease-in-out duration-150"
          enterFrom="transform opacity-0 scale-y-0"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-0"
        >
          <div className="mt-10 flex border-2 border-red-500 text-red-500 p-2 justify-center rounded">
            {error}
          </div>
        </Transition>
      </div>
    </IconWrapper>
  )
}

export default Signup;