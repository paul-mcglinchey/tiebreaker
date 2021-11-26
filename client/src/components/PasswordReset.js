import { useState } from 'react';
import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import StyledField from "./forms/StyledField";
import Userfront from "@userfront/core";

Userfront.init("wn9p69b5");

const PasswordReset = (props) => {

  const [error, setError] = useState('');

  const handleSubmit = (values) => {

    setError();

    if (values.password1 !== values.password2) {
        setError('Passwords must be matching!');
        return;
    }

    Userfront.resetPassword({
      password: values.password1
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
            password1: '',
            password2: ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="password1" type="password" placeholder="password1" errors={errors.password1} touched={touched.password1} />
                  <StyledField name="password2" type="password" placeholder="password2" errors={errors.password2} touched={touched.password2} />
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="px-4 py-2 border-purple-500 border-2 rounded font-bold hover:bg-purple-500 hover:text-white transition-all">
                    Reset Password
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

export default PasswordReset;