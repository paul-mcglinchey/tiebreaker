import AddNewButton from './components/AddNewButton';
import CustomerList from './components/ClientList';
import { useState } from 'react';
import AddNewClient from './components/AddNewClient';

function App() {

  const [newClientActive, setNewClientActive] = useState(false);
  const toggleNewClientActive = () => setNewClientActive(!newClientActive);

  return (
    <div className="App max-w-screen-lg mx-auto">
      <div className="container mx-auto mt-5 sm:border-4 rounded p-2 border-purple-600">
        <div className="flex justify-between">
          <h1 className="text-3xl font-mono font-bold">ClientSplash</h1>
          <div className="flex space-x-2">
            <AddNewButton toggleNewClientActive={() => toggleNewClientActive()} />
          </div>
        </div>
        {!newClientActive &&
          <CustomerList />
        }
        {newClientActive &&
          <AddNewClient />
        }
      </div>
    </div>
  );
}

export default App;
