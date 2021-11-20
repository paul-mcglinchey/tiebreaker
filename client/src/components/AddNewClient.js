import { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StyledErrorMessage from './forms/StyledErrorMessage';
import StyledField from './forms/StyledField';
import * as Yup from 'yup';
import parseDateString from "../helpers/dateParser";

const ClientSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  birthdate: Yup.date().transform(parseDateString).max(new Date()).min(new Date(1900, 0)),
});

const AddNewClient = (props) => {
  return (
    <Fragment>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '' }}
        validationSchema={ClientSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col py-2 space-y-1">
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-x-0 space-y-1 sm:space-y-0">
              <StyledField name="firstName" placeholder="First name">
                {errors.firstName && touched.firstName ? (
                  <StyledErrorMessage>{errors.firstName}</StyledErrorMessage>
                ) : null}
              </StyledField>
              <StyledField name="lastName" placeholder="Last name">
                {errors.lastName && touched.lastName ? (
                  <StyledErrorMessage>{errors.lastName}</StyledErrorMessage>
                ) : null}
              </StyledField>
            </div>
            <StyledField name="email" placeholder="Email">
              {errors.email && touched.email ? (
                <StyledErrorMessage>{errors.email}</StyledErrorMessage>
              ) : null}
            </StyledField>

            <button className="px-2 py-1 border-2 border-blue-300 bg-blue-500 text-white font-bold rounded-lg" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

export default AddNewClient;