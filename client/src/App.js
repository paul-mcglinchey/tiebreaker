import { useState } from 'react';
import AddNew from './components/AddNewButton';
import DropdownMenu from './components/DropdownMenu';
import RestaurantList from './components/RestaurantList';

function App() {

  const [cuisine, setCuisine] = useState('Cuisine');

  return (
    <div className="App">
      <div className="container mx-auto mt-5 border-4 rounded p-2 border-black">
        <div className="flex justify-between">
          <h1 className="text-3xl font-mono font-bold">ClientSplash</h1>
          <div className="flex space-x-2">
            <AddNew />
            <DropdownMenu setCuisine={() => setCuisine()}>{cuisine}</DropdownMenu>
          </div>
        </div>
        <RestaurantList />
      </div>
    </div>
  );
}

export default App;
