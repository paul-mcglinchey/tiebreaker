import { useApplicationService } from '../../hooks'
import { Table } from '../Common'
import { Panel, ApplicationTableRow } from '.'

const ApplicationPanel = () => {

  const { applications, count, isLoading } = useApplicationService()

  const headers = [
    { name: 'Identifier' },
    { name: 'Name' },
    { name: 'Description' },
    { name: 'Icon URL' },
    { name: 'URL/Route' },
    { name: '' },
  ]

  return (
    <>
      {!isLoading && (
        <Panel
          title="Applications"
          subtitle={`Number of applications: ${count}`}
          hideSave
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
    </>
  )
}

export default ApplicationPanel