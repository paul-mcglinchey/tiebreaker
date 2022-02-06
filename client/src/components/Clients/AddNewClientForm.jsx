import { useState } from "react";
import { Formik, Form } from "formik";
import Userfront from '@userfront/core';
import { Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { StyledField, StyledDatePicker, CustomCheckbox, CustomDate } from "..";
import { clientValidationSchema, endpoints, requestHelper } from "../../utilities";
import SubmitButton from "../Common/SubmitButton";

const AddNewClientForm = ({ userGroup, status, setStatus }) => {

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [addressActive, setAddressActive] = useState(false);
  const toggleAddressActive = () => setAddressActive(!addressActive);

  const handleSubmit = async (values) => {
    setStatus({
      isLoading: true,
      success: '',
      error: ''
    })

    if (!userGroup) {
      setStatus({
        isLoading: false,
        success: '',
        error: 'Group must be set'
      })

      return;
    }

    values.groupname = userGroup && userGroup.groupname;
    values.createdBy = values.updatedBy = Userfront.user.username;

    await fetch((endpoints.clients), requestHelper.requestBuilder('POST', values))
      .then(res => {
        if (res.ok) {
          setStatus({ isLoading: false, success: `Added client successfully`, error: '' });
        } else {
          setStatus({ isLoading: false, success: '', error: `A problem occurred adding the client` });
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus({ isLoading: false, success: '', error: '' });
      })
  }

  return (
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
      validationSchema={clientValidationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-grow flex-col space-y-3 content-end">
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
          </div>
          <div className="flex justify-end my-10">
            <SubmitButton status={status} content='Add client' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddNewClientForm;