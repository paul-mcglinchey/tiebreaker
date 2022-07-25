import { useState } from 'react'
import { usePermissionService } from '../../hooks'
import { Button, Table } from '../Common'
import { Panel, PermissionTableRow, PermissionModal } from '.'
import { PlusIcon } from '@heroicons/react/solid'

const PermissionPanel = () => {

  const { permissions, count, isLoading } = usePermissionService()

  const [addPermissionOpen, setAddPermissionOpen] = useState<boolean>(false)

  const headers = [
    { name: 'Identifier', value: 'identifier', interactive: true },
    { name: 'Name', value: 'name', interactive: true },
    { name: 'Description', value: 'description', interactive: true },
    { name: 'Language', value: 'language', interactive: true },
    { name: 'options', value: '', interactive: false },
  ]

  return (
    <>
      {!isLoading && (
        <Panel
          title="Permissions"
          subtitle={`Number of permissions: ${count}`}
          hideSave
          HeaderActions={
            <Button content='Add permission' Icon={PlusIcon} action={() => setAddPermissionOpen(true)} />
          }
        >
          <Table
            isLoading={isLoading}
          >
            <Table.Header headers={headers} />
            <Table.Body>
              {permissions.map((p, i) => (
                <PermissionTableRow key={i} permission={p} />
              ))}
            </Table.Body>
          </Table>
        </Panel>
      )}
      <PermissionModal 
        isOpen={addPermissionOpen}
        close={() => setAddPermissionOpen(false)}
      />
    </>
  )
}

export default PermissionPanel