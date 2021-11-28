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
import CustomCheckbox from './CustomCheckbox';
import Userfront from '@userfront/core';

const AddNewClient = (props) => {

  const { getClients } = props;

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasMessage, setHasMessage] = useState(false);
  const [failed, setFailed] = useState(false);

  const [addressActive, setAddressActive] = useState(false);
  const toggleAddressActive = () => setAddressActive(!addressActive);

  const postData = async (values) => {

    setIsLoading(true);
    setMessage('Loading');
    setHasMessage(true);
    setFailed(false);

    values.groupname = props.userGroup;
    console.log('posting:', values);

    fetch((endpoints.clients), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.message) {
            setMessage(result.message);
            setFailed(true);
          } else if (result.success) {
            setMessage(result.success);
            setFailed(false);
          }
          setIsLoading(false);
          getClients();
        }
      )
      .catch(
        (error) => {
          setIsLoading(false);
          setFailed(true);
          console.log(error.message);
        }
      )
  }

  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          middleNames: '',
          email: '',
          phoneNumber: '',
          birthdate: '1970-01-01',
          addressLineOne: '',
          addressLineTwo: '',
          addressLineThree: '',
          city: '',
          country: 'United Kingdom',
          postCode: '',
        }}
        validationSchema={ClientSchema}
        onSubmit={(values) => {
          console.log(values);
          postData(values);
        }}
      >
        {({ errors, touched }) => (
          <div className="md:flex flex-initial">
            <Form className="flex flex-grow flex-col py-2 space-y-3 lg:max-w-7/10 content-end">
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
              <div className="flex flex-col md:flex-row justify-between md:space-x-2 space-x-0 space-y-1 md:space-y-0">
                <StyledField name="email" placeholder="Email" errors={errors.email} touched={touched.email} />
                <StyledField name="phoneNumber" placeholder="Phone number" errors={errors.phoneNumber} touched={touched.phoneNumber} />
              </div>
              <div className="flex justify-between">
                <StyledDatePicker name="birthdate" label="Date of Birth" component={CustomDate} errors={errors.birthdate} touched={touched.birthdate} />
                <div>
                  <div className="flex-col">
                    <label className="block font-bold text-gray-500 mb-1 uppercase">
                      Address
                    </label>
                    <div className="flex justify-end">
                      <CustomCheckbox action={() => toggleAddressActive()} />
                    </div>
                  </div>
                </div>
              </div>
              <Transition
                show={addressActive}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-y-0"
                enterTo="transform opacity-100 scale-y-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-y-100"
                leaveTo="transform opacity-0 scale-y-0"
                className="origin-top"
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2">
                    <StyledField name="addressLineOne" placeholder="Address Line 1" errors={errors.addressLineOne} touched={touched.addressLineOne} />
                    <StyledField name="addressLineTwo" placeholder="Address Line 2" errors={errors.addressLineTwo} touched={touched.addressLineTwo} />
                    <StyledField name="addressLineThree" placeholder="Address Line 3" errors={errors.addressLineThree} touched={touched.addressLineThree} />
                  </div>
                  <div className="flex flex-1 md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
                    <div className="md:max-w-1/5">
                      <StyledField autocomplete="false" name="city" placeholder="City" errors={errors.city} touched={touched.city} />
                    </div>
                    <div className="relative">
                      <StyledField name="country" placeholder="Country" errors={errors.country} touched={touched.country} />
                    </div>
                    <StyledField name="postCode" placeholder="Post Code" errors={errors.postCode} touched={touched.postCode} />
                  </div>
                </div>
              </Transition>
              <div className="flex justify-end">
                <button className="px-3 py-1 mt-10 border-2 border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 transition-all font-bold rounded-lg flex" type="submit">
                  Add Client
                </button>
              </div>
            </Form>

            <div className="lg:flex flex-col lg:max-w-3/10 py-2 justify-end hidden">
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
                  {isLoading &&
                    <div className="w-8 h-8">
                      <SpinnerSVG />
                    </div>}
                  {message &&
                    <div>
                      {message} {!failed && <CheckIcon className="inline-block h-6 w-6" />}
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