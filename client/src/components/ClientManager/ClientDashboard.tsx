import { useState } from 'react';
import { useAuthService } from '../../hooks';
import { Toolbar, Prompter } from '../Common';
import { ClientModal, ClientList } from '.';
import { Application, Permission } from '../../enums';

const ClientDashboard = () => {
  const [addClientOpen, setAddClientOpen] = useState(false)
  const { hasPermission } = useAuthService()

  return (
    <>
      <>
        <Toolbar title="Clients" addClientAction={hasPermission(Application.ClientManager, Permission.AddEditDeleteClients) ? () => setAddClientOpen(true) : undefined} />
        {hasPermission(Application.ClientManager, Permission.ViewClients) ? (
          <ClientList setAddClientOpen={setAddClientOpen} />
        ) : (
          <Prompter title="You don't have access to view clients in this group" />
        )}
      </>
      <ClientModal isOpen={addClientOpen} close={() => setAddClientOpen(false)} compact/>
    </>
  )
}

export default ClientDashboard;