import { Fragment } from 'react';
import { Toolbar } from '../Common';
import { ClientList } from './Clients';

const ClientDashboard = () => {
  return (
    <Fragment>
        <>
          <Toolbar>Clients</Toolbar>
          <ClientList />
        </>
    </Fragment>
  )
}

export default ClientDashboard;