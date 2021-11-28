import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import SessionSchema from "../helpers/sessionValidationSchema";
import CustomDate from "./forms/CustomDate";
import StyledDatePicker from "./forms/StyledDatePicker";
import StyledField from "./forms/StyledField";
import { makeUSDate } from "../helpers/dateParser";
import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';

const AddNewSession = (props) => {

  const {clientData, addSessionOpen, toggleAddSession, getClients} = props;

  const updateSessions = (values) => {
    values._id = clientData._id;

    fetch(endpoints.addsession, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Userfront.tokens.accessToken}`
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success: ', data);
        toggleAddSession();
        getClients();
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  }

  return (
    <Transition
      show={addSessionOpen}
      enter="transition ease-in-out duration-500"
      enterFrom="transform opacity-0 scale-y-0"
      enterTo="transform opacity-100 scale-y-100"
      leave="transition ease-in-out duration-500"
      leaveFrom="transform opacity-100 scale-y-100"
      leaveTo="transform opacity-0 scale-y-0"
      className="absolute bg-white z-20 rounded-lg w-full h-auto top-0 left-0 p-4 filter drop-shadow-md"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">
            Add a new session for <span className="text-green-500">{clientData.clientName.firstName} {clientData.clientName.lastName}</span>.
          </div>
          <button onClick={() => toggleAddSession()} className="font-bold px-3 py-1 border-2 border-red-500 rounded-xl text-red-500 hover:bg-red-500 hover:text-white">
            Cancel
          </button>
        </div>
        <div className="h-full">
          <Formik
            initialValues={{
              title: '',
              description: '',
              notes: '',
              date: makeUSDate(Date.now(), '-')
            }}
            validationSchema={SessionSchema}
            onSubmit={(values) => {
              console.log(values);
              updateSessions(values);
            }}
          >
            {({ errors, touched }) => (
              <div className="md:flex flex-grow">
                <Form className="flex flex-grow flex-col py-2 mt-8">
                  <div className="flex flex-1 flex-col space-y-3">
                    <StyledField name="title" placeholder="Title" errors={errors.title} touched={touched.title} />
                    <StyledField name="description" placeholder="Description" component="textarea" errors={errors.description} touched={touched.description} />
                    <StyledField name="notes" placeholder="Notes" errors={errors.notes} touched={touched.notes} />
                    <StyledDatePicker name="date" label="Date of Session" component={CustomDate} errors={errors.date} touched={touched.date} />
                  </div>
                  <div className="flex flex-grow items-end justify-end">
                    <button className="px-3 py-1 mt-10 border-2 border-purple-500 text-purple-500 hover:text-white hover:bg-purple-500 transition-all font-bold rounded-lg flex" type="submit">
                      Add Session
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Transition>
  )
}

export default AddNewSession;