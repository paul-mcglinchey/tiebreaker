import { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import StyledField from './forms/StyledField';
import StyledDatePicker from './forms/StyledDatePicker';
import { SelectorIcon, UserAddIcon } from '@heroicons/react/solid';
import ClientSchema from '../helpers/clientValidationSchema';
import CustomDate from './forms/CustomDate';

const AddNewClient = (props) => {

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [message, setMessage] = useState('');

  return (
    <Fragment>
      <Formik
        initialValues={{ firstName: '', lastName: '', middleNames: '', email: '', birthdate: '' }}
        validationSchema={ClientSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <div className="flex space-x-2">
            <Form className="flex flex-grow flex-col py-2 space-y-3 lg:max-w-2/3 content-end">
              <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-1 md:space-y-0">
                <StyledField name="firstName" placeholder="First name" errors={errors.firstName} touched={touched.firstName} />
                {middleNamesRequired ? (
                  <StyledField name="middleNames" placeholder="Middle Names" errors={errors.middleNames} touched={touched.middleNames} />
                ) : (
                  <div className="relative flex md:block justify-center">
                    <button className="relative" onClick={() => toggleMiddleNamesRequired()}>
                      <SelectorIcon className="md:h-6 md:w-6 h-10 w-10 transform md:rotate-90 text-blue-500 hover:scale-110 transition-all" />
                    </button>
                  </div>
                )}
                <StyledField name="lastName" placeholder="Last name" errors={errors.lastName} touched={touched.lastName} />
              </div>
              <StyledField name="email" placeholder="Email" errors={errors.email} touched={touched.email} />
              <StyledDatePicker name="birthdate" label="Date of Birth" component={CustomDate} errors={errors.birthdate} touched={touched.birthdate} />
              <div className="flex justify-end">
                <button className="px-3 py-1 mt-10 border-2 border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 transition-all font-bold rounded-lg flex" type="submit">Add Client</button>
              </div>
            </Form>
            <div className="flex flex-col lg:max-w-1/3 py-2 justify-end hidden lg:block">
              <div className="flex flex-grow bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 text-4xl font-extrabold text-right mt-10">
                <span>
                  Add your clients here
                  <UserAddIcon className="inline-block text-blue-500 h-8 w-8 ml-2" />
                </span>
              </div>
              <div className="">

              </div>
            </div>
          </div>
        )}
      </Formik>
    </Fragment>
  )
}

export default AddNewClient;