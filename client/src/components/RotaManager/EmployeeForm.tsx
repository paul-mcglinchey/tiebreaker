import { useState } from "react";
import { Formik, Form } from "formik";
import { Transition } from "@headlessui/react";
import { useEmployeeService } from "../../hooks";
import { employeeValidationSchema } from "../../schema";
import { IContextualFormProps, IEmployee } from "../../models";
import { CustomDate, FormSection, Selector, StyledField, AddressForm, ListboxSelector } from "../Common";

interface IEmployeeFormProps {
  employee?: IEmployee | undefined
}

const EmployeeForm = ({ employee, ContextualSubmissionButton }: IEmployeeFormProps & IContextualFormProps) => {

  const [showAddress, setShowAddress] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

  const toggleShowAddress = () => setShowAddress(!showAddress);
  const toggleShowRequirements = () => setShowRequirements(!showRequirements);

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

  const { employees, getEmployee, addEmployee, updateEmployee } = useEmployeeService()

  return (
    <Formik
      initialValues={{
        reportsTo: employee?.reportsTo || '',
        role: employee?.role || '',
        name: {
          firstName: employee?.name.firstName || '',
          lastName: employee?.name.lastName || '',
          middleNames: employee?.name.middleNames || ''
        },
        address: {
          firstLine: employee?.address?.firstLine || '',
          secondLine: employee?.address?.secondLine || '',
          thirdLine: employee?.address?.thirdLine || '',
          city: employee?.address?.city || '',
          country: employee?.address?.country || '',
          postCode: employee?.address?.postCode || ''
        },
        contactInfo: {
          primaryPhoneNumber: employee?.contactInfo?.primaryPhoneNumber || '',
          primaryEmail: employee?.contactInfo?.primaryEmail || '',
          phoneNumbers: employee?.contactInfo?.phoneNumbers || [],
          emails: employee?.contactInfo?.emails || []
        },
        birthdate: employee?.birthdate || '',
        startDate: employee?.startDate || '',
        minHours: employee?.minHours || '',
        maxHours: employee?.maxHours || '',
        unavailableDays: employee?.unavailableDays || [],
        colour: employee?.colour || ''
      }}
      validationSchema={employeeValidationSchema}
      onSubmit={(values) => {
        employee ? updateEmployee(employee._id, values) : addEmployee(values);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="flex flex-grow flex-col space-y-6 content-end">
            <FormSection title="Job description">
              <div className="flex space-x-4">
                <ListboxSelector
                  label="Employee Role"
                  showLabel
                  items={[{ label: 'Staff', value: 'Staff' }, { label: 'Manager', value: 'Manager' }]}
                  selected={{ label: values.role, value: values.role }}
                  setSelected={(value) => setFieldValue('role', value)}
                  classes="col-span-2"
                  selectorClasses="bg-gray-900"
                  optionsClasses="w-full"
                />
                <ListboxSelector
                  label="Reports To"
                  showLabel
                  items={employees.map(e => ({ label: e.fullName, value: e._id }))}
                  selected={{ label: getEmployee(values.reportsTo)?.fullName, value: values.reportsTo }}
                  setSelected={(value) => setFieldValue('role', value)}
                  classes="col-span-2"
                  selectorClasses="bg-gray-900"
                  optionsClasses="w-full"
                />
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
          {ContextualSubmissionButton()}
        </Form>
      )}
    </Formik>
  )
}

export default EmployeeForm;