import { memo, useState } from 'react'
import { useFetch, useRefresh, useRequestBuilder } from '../../hooks'
import { ButtonType, IFetch, IPermissionsResponse } from '../../models'
import { endpoints } from '../../config'
import { Button, Fetch, Modal, Table } from '../Common'
import { Panel, PermissionEntry } from '.'
import { PlusIcon } from '@heroicons/react/solid'

const PermissionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { dependency } = useRefresh()

  const [addPermissionModalOpen, setAddPermissionModalOpen] = useState<boolean>(false)

  const headers = [
    { name: 'Identifier', value: 'identifier', interactive: true },
    { name: 'Name', value: 'name', interactive: true },
    { name: 'Description', value: 'description', interactive: true },
    { name: 'Language', value: 'language', interactive: true },
    { name: 'Type', value: 'type', interactive: false },
    { name: 'Options', value: 'options', interactive: false },
  ]

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.permissions, requestBuilder(), [dependency])}
      render={({ response, isLoading }: IFetch<IPermissionsResponse>) => (
        <>
          {!isLoading && response && (
            <Panel
              title="Permissions"
              subtitle={`Number of permissions: ${response.count}`}
              hideSave
              HeaderActions={
                <Button buttonType={ButtonType.Tertiary} content='Add permission' Icon={PlusIcon} action={() => setAddPermissionModalOpen(true)} />
              }
            >
              <Table
                headers={headers}
                isLoading={isLoading}
              >
                
              </Table>
              <div className="grid grid-cols-6 gap-2">
                {response.permissions.map((p, i) => (
                  <PermissionEntry key={i} permission={p} />
                ))}
              </div>
            </Panel>
          )}
          <Modal
            title="Add permission"
            description="This dialog can be used to create a new permission"
            isOpen={addPermissionModalOpen}
            close={() => setAddPermissionModalOpen(false)}
          >
            <div className="grid grid-cols-6">
              <PermissionEntry />
            </div>
          </Modal>
        </>
      )}
    />
  )
}

export default memo(PermissionPanel)