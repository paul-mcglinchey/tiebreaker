import { useState } from 'react';
import { AddNewClientForm } from '.';
import { Toolbar } from '..';

const AddNewClient = ({ userGroup, setUserGroup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  return (
    <div className="">
      <Toolbar userGroup={userGroup} setUserGroup={setUserGroup} isLoading={isLoading} success={success}>
        Add new clients
      </Toolbar>
      <AddNewClientForm userGroup={userGroup} setIsLoading={setIsLoading} setSuccess={setSuccess} />
    </div>
  )
}

export default AddNewClient;