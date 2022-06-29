import { memo, useState } from 'react'
import { useFetch, useRefresh, useRequestBuilder } from '../../hooks'
import { ButtonType, IFetch, IPermissionsResponse } from '../../models'
import { endpoints } from '../../config'
import { Button, Fetch, Modal } from '../Common'
import { Panel, PermissionEntry, PermissionHeader } from '.'
import { PlusIcon } from '@heroicons/react/solid'

const PermissionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { dependency } = useRefresh()

  const [addPermissionModalOpen, setAddPermissionModalOpen] = useState<boolean>(false)

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
              <div className="grid grid-cols-6">
                <PermissionHeader>Identifier</PermissionHeader>
                <PermissionHeader>Name</PermissionHeader>
                <PermissionHeader>Description</PermissionHeader>
                <PermissionHeader>Language</PermissionHeader>
                <PermissionHeader>Permission Type</PermissionHeader>
              </div>
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