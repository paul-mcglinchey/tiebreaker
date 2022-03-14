import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import { Transition } from "@headlessui/react";
import { ApplicationContext, employeeValidationSchema, endpoints, profileColours } from "../../utilities";
import { EmployeeRole, IAddEmployee, IEmployee, IFetch, Status } from "../../models";
import { requestBuilder } from "../../services";
import { CustomDate, StyledDatePicker, StyledField } from "../Forms";
import { FormSection, Selector, SubmitButton } from "../Common";
import { useFetch } from "../../hooks";
import { Fetch } from "../Fetch";

const AddEmployeeForm = () => {

  const { status, setStatus } = useContext(ApplicationContext);

  const [addressActive, setAddressActive] = useState(false);
  const toggleAddressActive = () => setAddressActive(!addressActive);

  const [requirementsActive, setRequirementsActive] = useState(false);
  const toggleRequirementsActive = () => setRequirementsActive(!requirementsActive);

  const [employeeRole, setEmployeeRole] = useState<{ value: EmployeeRole, label: EmployeeRole }>({ value: EmployeeRole.Staff, label: EmployeeRole.Staff });
  const [reportsTo, setReportsTo] = useState<{ value: string, label: string } | undefined>();

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
        value: e._id,
        label: (
          <div className="flex justify-between items-center">
            <div>{`${e.name.firstName} ${e.name.lastName}`}</div>
            <div style={{ backgroundColor: e.employeeColour }} className="uppercase text-xs font-semibold text-white rounded px-2 py-1">{e.role}</div>
          </div>
        )
      }
    });
  }

  const handleSubmit = async (values: IAddEmployee) => {
    setStatus([...status, {
      isLoading: true,
      message: '',
      type: Status.None
    }])

    // generates a new random colour to be used for profile display
    values.employeeColour = profileColours[Math.floor(Math.random() * profileColours.length)];

    await fetch(endpoints.employees, requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          setStatus([...status, { isLoading: false, message: `Added employee successfully`, type: Status.Success }]);
        } else {
          setStatus([...status, { isLoading: false, message: `A problem occurred adding the employee`, type: Status.Error }]);
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus([...status, { isLoading: false, message: `A problem occurred adding the employee`, type: Status.None }]);
      })
  }

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.employees, requestBuilder("GET"))}
      render={({ response }: IFetch) => (
        <Formik
          initialValues={{
            reportsTo: '',
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
            minHours: undefined,
            maxHours: undefined,
            unavailableDays: [],
            employeeColour: ''
          }}
          validationSchema={employeeValidationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-grow flex-col space-y-6 content-end">
                <FormSection title="Job description" isActivatable={false}>
                  <div className="flex space-x-4">
                    <Selector options={getEmployeeRoleOptions()} option={employeeRole} setValue={(e) => setEmployeeRole(e)} label="Employee role" />
                    {response && response.employees && (
                      <Selector options={getEmployeeOptions(response.employees)} option={reportsTo} setValue={(e) => setReportsTo(e)} label="Reports to" />
                    )}
                  </div>
                </FormSection>
                <FormSection title="Employee information" isActivatable={false}>
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
                    <StyledDatePicker name="birthdate" label="Date of Birth" component={CustomDate} errors={errors.birthdate} touched={touched.birthdate} />
                    <StyledDatePicker name="startDate" label="Start date" component={CustomDate} errors={errors.startDate} touched={touched.startDate} />
                  </div>
                </FormSection>
                <FormSection title="Employee address" isActivatable={true} activator={toggleAddressActive}>
                  <Transition
                    show={addressActive}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-y-0"
                    enterTo="transform opacity-100 scale-y-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-y-100"
                    leaveTo="transform opacity-0 scale-y-0"
                    className="origin-top flex flex-col space-y-2"
                  >
                    <div className="flex flex-col space-y-2">
                      <StyledField name="addressLineOne" label="Address Line 1" errors={errors.address?.firstLine} touched={touched.address?.firstLine} />
                      <StyledField name="addressLineTwo" label="Address Line 2" errors={errors.address?.secondLine} touched={touched.address?.secondLine} />
                      <StyledField name="addressLineThree" label="Address Line 3" errors={errors.address?.thirdLine} touched={touched.address?.thirdLine} />
                    </div>
                    <div className="flex flex-1 md:flex-row flex-col md:space-x-4 space-x-0 space-y-2 md:space-y-0">
                      <div className="basis-1/3">
                        <StyledField autoComplete="false" name="city" label="City" errors={errors.address?.city} touched={touched.address?.city} />
                      </div>
                      <div className="basis-1/3">
                        <StyledField name="country" label="Country" errors={errors.address?.country} touched={touched.address?.country} />
                      </div>
                      <StyledField name="postCode" label="Post Code" errors={errors.address?.postCode} touched={touched.address?.postCode} />
                    </div>
                  </Transition>
                </FormSection>
                <FormSection title="Scheduling requirements" isActivatable={true} activator={toggleRequirementsActive}>
                  <Transition
                    show={requirementsActive}
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
                <SubmitButton status={status[status.length - 1] || []} content='Add Employee' />
              </div>
            </Form>
          )}
        </Formik>
      )}
    />
  )
}

export default AddEmployeeForm;