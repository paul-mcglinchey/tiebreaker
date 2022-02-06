import { useState } from 'react';
import { Link } from 'react-router-dom';
import Userfront from "@userfront/core";
import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';

import { IconWrapper } from '.';
import { StyledField } from '..';
import { loginValidationSchema } from '../../utilities';
import SubmitButton from '../Common/SubmitButton';

Userfront.init("wn9p69b5");

const Login = (props) => {

  const [error, setError] = useState();

  const handleSubmit = (values) => {
    setError();

    Userfront.login({
      method: "password",
      emailOrUsername: values.emailOrUsername,
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
            emailOrUsername: '',
            password: ''
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="emailOrUsername" placeholder="Email or Username" errors={errors.emailOrUsername} touched={touched.emailOrUsername} />
                  <StyledField name="password" type="password" placeholder="Password" errors={errors.password} touched={touched.password} />
                </div>
                <div className="flex justify-between">
                  <Link to='/signup'>
                    <button type="button" className="px-4 py-2 font-bold text-gray-500 hover:text-gray-300 filter drop-shadow-none shadow-none transition-all">
                      Sign Up
                    </button>
                  </Link>
                  <SubmitButton content="Login"/>
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

export default Login;