import { Transition } from "@headlessui/react";
import { Formik, Form } from 'formik';
import SessionSchema from "../helpers/sessionValidationSchema";
import CustomDate from "./forms/CustomDate";
import StyledDatePicker from "./forms/StyledDatePicker";
import StyledField from "./forms/StyledField";
import { makeUSDate } from "../helpers/dateParser";
import endpoints from "../config/endpoints";
import Userfront from '@userfront/core';
import CustomTagger from "./forms/CustomTagger";

const AddNewSession = (props) => {

  const { clientData, addSessionOpen, toggleAddSession, getClients } = props;

  const updateSessions = (values) => {
    values._id = clientData._id;

    fetch(endpoints.addsession, {
      mode: 'cors',
      credentials: 'include',
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
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute bg-white z-20 rounded-lg w-3/4 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 p-4 filter shadow-md"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">
            Add a new session for <span className="text-green-500">{clientData.clientName.firstName} {clientData.clientName.lastName}</span>.
          </div>
          <button onClick={() => toggleAddSession()} className="font-bold px-3 py-1 border-2 border-red-500 rounded-xl text-red-500 hover:bg-red-500 hover:text-white">
            Close
          </button>
        </div>
        <div className="h-full">
          <Formik
            initialValues={{
              title: '',
              description: '',
              notes: [
                {
                  content: ''
                },
              ],
              date: makeUSDate(Date.now(), '-')
            }}
            validationSchema={SessionSchema}
            onSubmit={(errors, values) => {
              console.log(errors);
              updateSessions(values);
            }}
          >
            {({ errors, touched, values }) => (
              <div className="md:flex flex-grow">
                <Form className="flex flex-grow flex-col py-2 mt-8">
                  <div className="flex flex-1 flex-col space-y-3">
                    <StyledField name="title" placeholder="Title" errors={errors.title} touched={touched.title} />
                    <StyledField name="description" placeholder="Description" component="textarea" errors={errors.description} touched={touched.description} />
                    <CustomTagger />
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