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
import addNewClient from '../requests/addNewClient';

const AddNewClient = (props) => {

  const { userGroup } = props;

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
    );
  }

  return (
    <div className="">
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
          <div className="flex flex-col lg:flex-row lg:flex-row-reverse flex-initial space-y-4 lg:space-y-0">
            <div className="flex text-white bg-purple-brand justify-center font-bold rounded-xl sm:py-4 py-6 lg:ml-4 lg:font-extrabold text-2xl sm:text-3xl lg:text-5xl lg:px-4 lg:max-w-4/10 shadow-sm text-center lg:text-right">
              <div className="inline-block">
                Add your clients here
                <span className="inline-block align-middle">
                  <UserAddIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2" />
                </span>
              </div>
            </div>
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

          </div>
        )}
      </Formik>
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
  )
}

export default AddNewClient;