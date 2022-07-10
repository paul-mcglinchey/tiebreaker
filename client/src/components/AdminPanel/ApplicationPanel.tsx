import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/solid'
import { useApplicationService } from '../../hooks'
import { Button, Table } from '../Common'
import { Panel, ApplicationTableRow, ApplicationModal } from '.'
import { ButtonType } from '../../enums'

const ApplicationPanel = () => {

  const { applications = [], count, isLoading } = useApplicationService()

  const [addApplicationOpen, setAddApplicationOpen] = useState<boolean>(false)

  const headers = [
    { name: 'Identifier' },
    { name: 'Name' },
    { name: 'Description' },
    { name: 'URL/Route' },
    { name: 'Options' },
  ]

  return (
    <>
      {!isLoading && (
        <Panel
          title="Applications"
          subtitle={`Number of applications: ${count}`}
          hideSave
          HeaderActions={
            <Button buttonType={ButtonType.Tertiary} content='Add application' Icon={PlusIcon} action={() => setAddApplicationOpen(true)} />
          }
        >
          <Table isLoading={isLoading}>
            <Table.Header headers={headers} />
            <Table.Body>
              {applications.map((a, i) => (
                <ApplicationTableRow key={i} application={a} />
              ))}
            </Table.Body>
          </Table>
        </Panel>
      )}
      <ApplicationModal 
        isOpen={addApplicationOpen}
        close={() => setAddApplicationOpen(false)}
      />
    </>
  )
}

export default ApplicationPanel