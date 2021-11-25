import { useState } from 'react';
import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import StyledField from "./forms/StyledField";
import endpoints from "../config/endpoints";
import LoginSchema from "../helpers/loginSchema";
import { useDispatch } from 'react-redux';
import allActions from '../actions';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (props) => {

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } }

  const authenticate = (values) => {
    fetch(endpoints.signin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.message
          ? setMessage(data.message)
          : dispatch(allActions.userActions.setUser({ name: data.username }));
        navigate(from);
      })
      .catch((error) => {
        setMessage(error.message);
      })

  }

  return (
    <div className="relative max-w-login h-screen mx-auto">

      <div className="absolute top-1/4 rounded w-full p-4 filter drop-shadow-sm">
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            authenticate(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                <div className="flex-col space-y-2">
                  <StyledField name="username" placeholder="Username" errors={errors.username} touched={touched.username} />
                  <StyledField name="password" type="password" placeholder="Password" errors={errors.password} touched={touched.password} />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 border-purple-500 border-2 rounded font-bold hover:bg-purple-500 hover:text-white transition-all">
                    Login
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Transition
          show={message ? true : false}
          enter="transition ease-in-out duration-150"
          enterFrom="transform opacity-0 scale-y-0"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-0"
        >
          <div className="mt-10 flex border-2 border-red-500 text-red-500 p-2 justify-center rounded">
            {message}
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Login;