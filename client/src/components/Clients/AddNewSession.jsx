import { useState } from "react";
import Userfront from '@userfront/core';
import { Formik, Form } from 'formik';
import { Transition } from "@headlessui/react";

import { StyledField, StyledDatePicker, CustomDate } from "..";
import { endpoints, dateHelper, sessionValidationSchema } from '../../utilities';

const AddNewSession = (props) => {

  const { c, toggleAddSession } = props;

  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const updateSessions = async (values) => {
    values._id = c._id;
    values.notes = notes;

    console.log(values);

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
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  }

  const handleChange = noteValue => {
    if (noteValue.includes(" ") && noteValue.trim().length > 0) {
      setNotes(notes.concat(noteValue.split(" ")[0]))
      setNote('');
    } else if (noteValue.trim().length === 0) {
      setNote('');
    } else {
      setNote(noteValue);
    }
  }

  const removeNote = index => {
    setNotes(notes.filter(n => n !== notes[index]));
  }

  return (
    <Transition
      show={false}
      enter="transition ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="absolute bg-gray-900 z-20 rounded-lg w-3/4 left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 p-4 filter shadow-md"
    >
      <div className="flex flex-col h-full text">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold">
            Add a new session for <span className="text-green-500">{c.clientName.firstName} {c.clientName.lastName}</span>.
          </div>
          <button onClick={() => toggleAddSession()} className="font-bold px-3 py-1 border-2 border-transparent hover:border-red-500 rounded-xl text-red-500 transition-all">
            Close
          </button>
        </div>
        <div className="h-full">
          <Formik
            initialValues={{
              title: '',
              description: '',
              date: dateHelper.makeUSDate(Date.now(), '-')
            }}
            validationSchema={sessionValidationSchema}
            onSubmit={(values) => {
              updateSessions(values);
            }}
          >
            {({ errors, touched, values }) => (
              <div className="md:flex flex-grow">
                <Form className="flex flex-grow flex-col py-2 mt-8">
                  <div className="flex flex-1 flex-col space-y-3">
                    <StyledField name="title" placeholder="Title" errors={errors.title} touched={touched.title} />
                    <StyledField name="description" placeholder="Description" component="textarea" errors={errors.description} touched={touched.description} />
                    <div className="flex flex-col">
                      <label htmlFor="notes" className="uppercase tracking-wide text-gray-500 font-bold">Notes</label>
                      <div className="inline-flex flex-wrap flex-1 border-2 border-gray-800 bg-gray-800 rounded h-10 py-2">
                        {notes.map((n, i) => {
                          return (
                            <button
                              type="button"
                              key={i}
                              className="flex my-1 mx-1 px-2 rounded text-white tracking-wide uppercase text-xs font-medium border items-center hover:text-red-500 hover:border-red-500"
                              onClick={() => removeNote(i)}
                            >
                              <span>{n}</span>
                            </button>
                          )
                        })}
                        <input className="bg-transparent max-w-full flex-1 ring-0 focus:ring-0 outline-none focus:outline-none" name="notes" value={note} onChange={(e) => handleChange(e.target.value)} />
                      </div>
                    </div>
                    <StyledDatePicker name="date" label="Date of Session" component={CustomDate} errors={errors.date} touched={touched.date} />
                  </div>
                  <div className="flex flex-grow items-end justify-end">
                    <button type="submit" className="px-3 py-1 mt-10 border-2 border-transparent text-purple-500 hover:border-blue-800 transition-all font-bold rounded-lg flex">
                      Add Session
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Transition >
  )
}

export default AddNewSession;