import { useState } from 'react';
import { AddNewClientForm } from '.';
import { Toolbar } from '..';

const AddNewClient = ({ userGroup, setUserGroup }) => {
  const [status, setStatus] = useState({
    isLoading: false,
    success: '',
    error: ''
  });

  return (
    <div className="">
      <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} status={status}>
        Add new clients
      </Toolbar>
      <AddNewClientForm userGroup={userGroup} status={status} setStatus={setStatus}/>
    </div>
  )
}

export default AddNewClient;