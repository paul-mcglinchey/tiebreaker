import { useState } from "react";
import { Formik, Form } from "formik";
import { Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { requestBuilder } from "../../../services";
import { CustomCheckbox, CustomDate, StyledDatePicker, StyledField, SubmitButton } from "../..";
import { clientValidationSchema, endpoints, profileColours } from "../../../utilities";
import { IAddClient, IApplicationContext } from "../../../models";

const AddNewClientForm = ({ userGroup, status, setStatus }: IApplicationContext) => {

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [addressActive, setAddressActive] = useState(false);
  const toggleAddressActive = () => setAddressActive(!addressActive);

  const handleSubmit = async (values: IAddClient) => {
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

    values.groupName = userGroup && userGroup.groupName;

    // generates a new random colour to be used for profile display
    values.clientColour = profileColours[Math.floor(Math.random() * profileColours.length)];

    await fetch(endpoints.clients, requestBuilder('POST', undefined, values))
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
              <StyledField name="firstName" label="First name" errors={errors.firstName} touched={touched.firstName} />
              {middleNamesRequired ? (
                <StyledField name="middleNames" label="Middle Names" errors={errors.middleNames} touched={touched.middleNames} />
              ) : (
                <div className="relative flex md:block justify-center">
                  <button className="relative" onClick={() => toggleMiddleNamesRequired()}>
                    <SelectorIcon className="md:h-6 md:w-6 h-10 w-10 transform md:rotate-90 text-blue-500 hover:scale-110 transition-all" />
                  </button>
                </div>
              )}
              <StyledField name="lastName" label="Last name" errors={errors.lastName} touched={touched.lastName} />
            </div>
            <div className="flex flex-col md:flex-row justify-between md:space-x-2 space-x-0 space-y-1 md:space-y-0">
              <StyledField name="email" label="Email" errors={errors.email} touched={touched.email} />
              <StyledField name="phoneNumber" label="Phone number" errors={errors.phoneNumber} touched={touched.phoneNumber} />
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
                  <StyledField name="addressLineOne" label="Address Line 1" errors={errors.addressLineOne} touched={touched.addressLineOne} />
                  <StyledField name="addressLineTwo" label="Address Line 2" errors={errors.addressLineTwo} touched={touched.addressLineTwo} />
                  <StyledField name="addressLineThree" label="Address Line 3" errors={errors.addressLineThree} touched={touched.addressLineThree} />
                </div>
                <div className="flex flex-1 md:flex-row flex-col md:space-x-2 space-x-0 space-y-2 md:space-y-0">
                  <div className="md:max-w-1/5">
                    <StyledField autocomplete="false" name="city" label="City" errors={errors.city} touched={touched.city} />
                  </div>
                  <div className="relative">
                    <StyledField name="country" label="Country" errors={errors.country} touched={touched.country} />
                  </div>
                  <StyledField name="postCode" label="Post Code" errors={errors.postCode} touched={touched.postCode} />
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