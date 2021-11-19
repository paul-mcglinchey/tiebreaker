import AddNew from './components/AddNewButton';
import DropdownMenu from './components/DropdownMenu';
import CustomerList from './components/CustomerList';

function App() {

  return (
    <div className="App container-md">
      <div className="container mx-auto mt-5 border-4 rounded p-2 border-black">
        <div className="flex justify-between">
          <h1 className="text-3xl font-mono font-bold">ClientSplash</h1>
          <div className="flex space-x-2">
            <AddNew />
            <DropdownMenu></DropdownMenu>
          </div>
        </div>
        <CustomerList />
      </div>
    </div>
  );
}

export default App;
