import { useState } from 'react'
import { usePermissionService } from '../../hooks'
import { ButtonType } from '../../models'
import { Button, Modal, Table } from '../Common'
import { Panel, PermissionTableRow, PermissionForm } from '.'
import { PlusIcon } from '@heroicons/react/solid'

const PermissionPanel = () => {

  const { permissions, count, isLoading } = usePermissionService()

  const [addPermissionModalOpen, setAddPermissionModalOpen] = useState<boolean>(false)

  const headers = [
    { name: 'Identifier', value: 'identifier', interactive: true },
    { name: 'Name', value: 'name', interactive: true },
    { name: 'Description', value: 'description', interactive: true },
    { name: 'Language', value: 'language', interactive: true },
    { name: 'Type', value: 'type', interactive: false },
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
            <Button buttonType={ButtonType.Tertiary} content='Add permission' Icon={PlusIcon} action={() => setAddPermissionModalOpen(true)} />
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
      <Modal
        title="Add permission"
        description="This dialog can be used to create a new permission"
        isOpen={addPermissionModalOpen}
        close={() => setAddPermissionModalOpen(false)}
      >
        <PermissionForm />
      </Modal>
    </>
  )
}

export default PermissionPanel