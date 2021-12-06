import { useState } from 'react';
import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import StyledField from "./forms/StyledField";
import Userfront from "@userfront/core";
import { Link } from 'react-router-dom';
import SignupSchema from '../helpers/signupSchema';
import endpoints from '../config/endpoints';

Userfront.init("wn9p69b5");

const Signup = (props) => {

  const [error, setError] = useState('');

  const handleSubmit = (values) => {

    setError();

    Userfront.signup({
      method: "password",
      email: values.email,
      username: values.username,
      password: values.password
    })
      .then(() => {
        fetch(endpoints.configureuser, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Userfront.tokens.accessToken}`
          },
          body: JSON.stringify({ email: values.email, username: values.username })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch((error) => {
            setError(error.message);
          })
      })
      .catch((error) => {
        setError(error.message);
      })
  }

  return (
    <div className="relative max-w-login h-screen mx-auto">

      <div className="absolute top-1/4 rounded w-full p-4 filter drop-shadow-sm">
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="email" placeholder="Email" errors={errors.email} touched={touched.email} />
                  <StyledField name="username" placeholder="Username" errors={errors.username} touched={touched.username} />
                  <StyledField name="password" type="password" placeholder="Password" errors={errors.password} touched={touched.password} />
                </div>
                <div className="flex justify-between">
                  <Link to='/login'>
                    <button type="button" className="px-4 py-2 font-bold text-gray-500 hover:text-gray-800 filter drop-shadow-none shadow-none transition-all">
                      Log In
                    </button>
                  </Link>
                  <button type="submit" className="px-4 py-2 border-purple-500 border-2 rounded font-bold hover:bg-purple-500 hover:text-white transition-all">
                    Sign Up
                  </button>
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
    </div>
  )
}

export default Signup;