import { useState } from "react";
import { Formik, Form } from "formik";
import { Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { generateColour } from "../../../../services";
import { CustomDate, StyledField, Button } from "../../..";
import { clientValidationSchema } from "../../../../utilities";
import { AddressForm, FormSection } from "../../../Common";
import { IClient } from "../../../../models";
import { useClientService, useGroupService } from "../../../../hooks";

interface IClientFormProps {
  client?: IClient,
  refresh?: () => void
}

const ClientForm = ({ client, refresh }: IClientFormProps) => {

  const { groupId } = useGroupService()
  const clientService = useClientService(refresh);

  const [middleNamesRequired, setMiddleNamesRequired] = useState(false);
  const toggleMiddleNamesRequired = () => setMiddleNamesRequired(!middleNamesRequired);

  const [addressActive, setAddressActive] = useState(false);

  return (
    <Formik
      initialValues={client || {
        name: {
          firstName: '',
          lastName: '',
          middleNames: ''
        },
        address: {
          firstLine: '',
          secondLine: '',
          thirdLine: '',
          city: '',
          country: '',
          postCode: ''
        },
        contactInfo: {
          primaryPhoneNumber: '',
          primaryEmail: '',
          phoneNumbers: [],
          emails: []
        },
        birthdate: '',
      }}
      validationSchema={clientValidationSchema}
      onSubmit={(values, actions) => {
        clientService.addClient({ ...values, colour: generateColour() }, groupId);
        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="flex flex-grow flex-col space-y-3 content-end">
            <div className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-1 md:space-y-0">
              <StyledField name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
              {middleNamesRequired ? (
                <StyledField name="name.middleNames" label="Middle Names" errors={errors.name?.middleNames} touched={errors.name?.middleNames} />
              ) : (
                <div className="relative flex md:block justify-center">
                  <button className="relative" onClick={() => toggleMiddleNamesRequired()}>
                    <SelectorIcon className="md:h-6 md:w-6 h-10 w-10 transform md:rotate-90 text-blue-500 hover:scale-110 transition-all" />
                  </button>
                </div>
              )}
              <StyledField name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={errors.name?.lastName} />
            </div>
            <div className="flex flex-col md:flex-row justify-between md:space-x-2 space-x-0 space-y-1 md:space-y-0">
              <StyledField name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
              <StyledField name="contactInfo.primaryPhoneNumber" label="Phone number" errors={errors.contactInfo?.primaryPhoneNumber} touched={touched.contactInfo?.primaryPhoneNumber} />
            </div>
            <div className="flex justify-between">
              <StyledField type="date" name="birthdate" label="Date of Birth" component={CustomDate} errors={errors.birthdate} touched={touched.birthdate} />
            </div>
          </div>
          <div>
            <FormSection title="Address" state={addressActive} setState={setAddressActive}>
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
                <AddressForm errors={errors} touched={touched} />
              </Transition>
            </FormSection>
          </div>
          <div className="flex justify-end my-10">
            <Button content='Add client' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ClientForm;