import { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import StyledField from './forms/StyledField';
import StyledDatePicker from './forms/StyledDatePicker';
import { Transition } from '@headlessui/react';
import { SelectorIcon, UserAddIcon, CheckIcon } from '@heroicons/react/solid';
import ClientSchema from '../helpers/clientValidationSchema';
import CustomDate from './forms/CustomDate';
import endpoints from '../config/endpoints';
import SpinnerSVG from './svg/SpinnerSVG';

const AddNewClient = (props) => {

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasMessage, setHasMessage] = useState(false);
  const [failed, setFailed] = useState(false);

  const postData = async (values) => {

    setIsLoading(true);
    setMessage('Loading');
    setHasMessage(true);
    setFailed(false);
    
    console.log("posting", values);

    fetch((endpoints.clients), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoading(false);
          setMessage('Client added');
        }
      )
      .catch(
        (error) => {
          console.log(error);
          setIsLoading(false);
          setFailed(true);
          setMessage('Failed to add client');
        }
      )
  }

  return (
    <Fragment>
      <Formik
        initialValues={{ firstName: '', lastName: '', middleNames: '', email: '', birthdate: '' }}
        validationSchema={ClientSchema}
        onSubmit={(values) => {
          console.log(values);
          postData(values);
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
            <div className="lg:flex flex-col lg:max-w-1/3 py-2 justify-end hidden">
              <div className="flex flex-grow bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 lg:text-4xl xl:text-5xl font-extrabold text-right mt-10">
                <span>
                  Add your clients here
                  <UserAddIcon className="inline-block text-blue-500 h-8 w-8 ml-2" />
                </span>
              </div>
              <Transition
                show={hasMessage}
                enter="transition ease-out duration-75"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
                className="flex justify-end"
              >
                <div className={`
                  flex flex-shrink inline-block px-3 py-1 border-2 
                  ${failed ? "border-red-500 text-red-500" : (isLoading ? "border-blue-500 text-blue-500" : "border-green-500 text-green-500")} 
                  font-bold rounded-lg transition-all
                  `}
                >
                  {failed &&
                  <div>
                    {message}
                  </div>}
                  {isLoading &&
                  <div className="w-8 h-8">
                    <SpinnerSVG />
                  </div>}
                  {message &&
                  <div>
                    {message} {!failed && <CheckIcon className="inline-block h-6 w-6"/>}
                  </div>}
                </div>
              </Transition>
            </div>
          </div>
        )}
      </Formik>
    </Fragment>
  )
}

export default AddNewClient;