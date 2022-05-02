import { useState } from "react";
import { Formik, Form } from "formik";
import { Transition } from "@headlessui/react";
import { useEmployeeService, useGroupService } from "../../hooks";
import { employeeValidationSchema } from "../../schema";
import { EmployeeRole, IEmployee } from "../../models";
import { CustomDate, FormSection, Selector, StyledField, Button, AddressForm } from "../Common";

const FullEmployeeForm = () => {

  const { groupId } = useGroupService()

  const [showAddress, setShowAddress] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const toggleShowAddress = () => setShowAddress(!showAddress);
  const toggleShowRequirements = () => setShowRequirements(!showRequirements);

  const getEmployeeRoleOptions = (): { value: string, label: string }[] => {
    return Object.keys(EmployeeRole).map((er: string) => {
      return {
        value: er,
        label: er
      }
    });
  }

  const getEmployeeOptions = (employees: IEmployee[]): { value: string, label: any }[] => {
    return employees.map((e: IEmployee) => {
      return {
        value: e._id || "",
        label: (
          <div className="flex justify-between items-center">
            <div>{`${e.name.firstName} ${e.name.lastName}`}</div>
            <div style={{ backgroundColor: e.colour }} className="uppercase text-xs font-semibold text-white rounded px-2 py-1">{e.role}</div>
          </div>
        )
      }
    })
  }

  const { getEmployees, addEmployee } = useEmployeeService()
  const employees = getEmployees()

  return (
    <Formik
      initialValues={{
        reportsTo: '',
        employeeRole: '',
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
        startDate: '',
        minHours: '',
        maxHours: '',
        unavailableDays: [],
        employeeColour: ''
      }}
      validationSchema={employeeValidationSchema}
      onSubmit={(values) => {
        addEmployee(values, groupId);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="flex flex-grow flex-col space-y-6 content-end">
            <FormSection title="Job description">
              <div className="flex space-x-4">
                <Selector options={getEmployeeRoleOptions()} option={getEmployeeRoleOptions()[0]} setValue={(e) => setFieldValue('employeeRole', e)} label="Employee role" />
                {employees && (
                  <Selector options={getEmployeeOptions(employees)} option={''} setValue={(e) => setFieldValue('reportsTo', e)} label="Reports to" />
                )}
              </div>
            </FormSection>
            <FormSection title="Employee information">
              <div className="flex flex-col md:flex-row md:space-x-4 space-x-0 space-y-1 md:space-y-0">
                <StyledField name="name.firstName" label="First name" errors={errors.name?.firstName} touched={touched.name?.firstName} />
                <StyledField name="name.middleNames" label="Middle Names" errors={errors.name?.middleNames} touched={touched.name?.middleNames} />
                <StyledField name="name.lastName" label="Last name" errors={errors.name?.lastName} touched={touched.name?.lastName} />
              </div>
              <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-x-0 space-y-1 md:space-y-0">
                <StyledField name="contactInfo.primaryEmail" label="Email" errors={errors.contactInfo?.primaryEmail} touched={touched.contactInfo?.primaryEmail} />
                <StyledField name="contactInfo.primaryPhone" label="Phone number" errors={errors.contactInfo?.primaryPhoneNumber} touched={touched.contactInfo?.primaryPhoneNumber} />
              </div>
              <div className="flex space-x-4">
                <StyledField type="date" name="birthdate" label="Date of Birth" component={CustomDate} errors={errors.birthdate} touched={touched.birthdate} />
                <StyledField type="date" name="startDate" label="Start date" component={CustomDate} errors={errors.startDate} touched={touched.startDate} />
              </div>
            </FormSection>
            <FormSection title="Employee address" showExpander expanded={showAddress} expanderAction={toggleShowAddress}>
              <Transition
                show={showAddress}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-y-0"
                enterTo="transform opacity-100 scale-y-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-y-100"
                leaveTo="transform opacity-0 scale-y-0"
                className="origin-top flex flex-col space-y-2"
              >
                <AddressForm errors={errors.address} touched={touched.address} />
              </Transition>
            </FormSection>
            <FormSection title="Scheduling requirements" showExpander expanded={showRequirements} expanderAction={toggleShowRequirements}>
              <Transition
                show={showRequirements}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-y-0"
                enterTo="transform opacity-100 scale-y-100"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-y-100"
                leaveTo="transform opacity-0 scale-y-0"
                className="origin-top flex flex-col space-y-2"
              >
                <div className="flex flex-col md:flex-row md:space-x-4 space-x-0 space-y-2 md:space-y-0">
                  <StyledField name="minHours" label="Minimum hours" errors={errors.minHours} touched={touched.minHours} />
                  <StyledField name="maxHours" label="Maximum hours" errors={errors.maxHours} touched={touched.maxHours} />
                </div>
              </Transition>
            </FormSection>
          </div>
          <div className="flex justify-end my-10">
            <Button content='Add Employee' />
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FullEmployeeForm;