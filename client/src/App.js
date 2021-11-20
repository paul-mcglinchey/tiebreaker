import AddNewButton from './components/AddNewButton';
import CustomerList from './components/ClientList';
import { useState } from 'react';
import AddNewClient from './components/AddNewClient';
import { Transition } from '@headlessui/react';

function App() {

  const [newClientActive, setNewClientActive] = useState(false);
  const toggleNewClientActive = () => setNewClientActive(!newClientActive);

  return (
    <div className="App max-w-screen-lg mx-auto font-sans subpixel-antialiased">
      <div className="container mx-auto mt-5 sm:border-4 rounded-xl p-2 border-purple-600">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-clip-text bg-gradient-to-r from-blue-500 to-green-500bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 text-transparent text-5xl font-extrabold">
            <h1>ClientSplash</h1>
          </div>
          <div className="flex space-x-2">
            <AddNewButton toggleNewClientActive={() => toggleNewClientActive()} newClientActive={newClientActive} />
          </div>
        </div>
        <Transition
          show={!newClientActive}
          enter="transition ease-out duration-75"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <CustomerList />
        </Transition>
        <Transition
          show={newClientActive}
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <AddNewClient />
        </Transition>
      </div>
    </div>
  );
}

export default App;
