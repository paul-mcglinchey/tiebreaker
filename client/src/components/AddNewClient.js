import { useState } from 'react';
import { Formik, Form } from 'formik';
import StyledField from './forms/StyledField';
import StyledDatePicker from './forms/StyledDatePicker';
import { Transition } from '@headlessui/react';
import { SelectorIcon, UserAddIcon, CheckIcon, XCircleIcon } from '@heroicons/react/solid';
import ClientSchema from '../helpers/clientValidationSchema';
import CustomDate from './forms/CustomDate';
import SpinnerSVG from './svg/SpinnerSVG';
import CustomCheckbox from './CustomCheckbox';
import addNewClient from '../fetches/addNewClient';

const AddNewClient = (props) => {

  const { getClients, userGroup } = props;

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasMessage, setHasMessage] = useState(false);
  const [failed, setFailed] = useState(false);

  const [addressActive, setAddressActive] = useState(false);
  const toggleAddressActive = () => setAddressActive(!addressActive);


  const handleSubmit = async (values) => {

    values.userGroup = userGroup;
    console.log('posting:', values);

    addNewClient(
      values,
      setMessage,
      setHasMessage,
      setFailed,
      setIsLoading,
      getClients
    );
  }

  return (
    <div className="px-2 sm:px-6 lg:px-8">
      <div className="flex lg:hidden text-2xl sm:text-3xl font-bold py-2 sm:py-4 my-4 bg-purple-brand justify-center items-center text-white rounded">
        Add your clients here
        <UserAddIcon className="inline-block h-8 w-8 ml-4" />
      </div>
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
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <div className="lg:flex flex-col md:flex-row flex-initial space-x-4 py-2">
            <Form className="flex flex-grow flex-col space-y-3 lg:max-w-7/10 content-end">
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
                <button className="px-3 py-1 mt-10 border-2 border-purple-brand text-purple-brand hover:text-white hover:bg-purple-brand transition-all font-bold rounded-lg flex" type="submit">
                  Add Client
                </button>
              </div>
            </Form>

            <div className="flex lg:flex-col lg:max-w-3/10 max-w-full lg:justify-end justify-center mt-10 lg:mt-0">
              <div className="lg:flex flex-grow bg-purple-brand text-white rounded-xl filter drop-shadow-sm lg:text-4xl xl:text-5xl font-extrabold text-right pt-10 px-4 hidden">
                <span>
                  Add your clients here
                  <UserAddIcon className="inline-block h-8 w-8 ml-2" />
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
                className="flex sm:flex-initial flex-grow lg:justify-end justify-center mt-4"
              >
                <div className={`
                  flex px-3 py-1 border-2 space-x-2 items-center font-bold rounded-lg
                  ${!failed ? (isLoading ? "border-blue-500 text-blue-500" : "border-green-500 text-green-500") : "border-red-500 text-red-500"}
                  `}
                >
                  <div>
                    {message}
                  </div>
                  <div>
                    {message && !failed ? (
                      isLoading ? (
                        <div className="w-4 h-4">
                          <SpinnerSVG />
                        </div>
                      ) : (
                        <CheckIcon className="inline-block h-6 w-6" />
                      )
                    ) : (
                      <XCircleIcon className="inline-block h-6 w-6" />
                    )}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default AddNewClient;