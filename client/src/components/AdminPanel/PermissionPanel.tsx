import { memo } from 'react'
import { useFetch, useRefresh, useRequestBuilder } from '../../hooks'
import { IFetch, IPermission, IPermissionsResponse } from '../../models'
import { endpoints } from '../../config'
import { Fetch } from '../Common'
import { Panel, SubPanel, SubPanelContent, Permission } from '.'

const PermissionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()

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
            >
              <SubPanel>
                <SubPanelContent>
                  {response.permissions.map((permission: IPermission, index: number) => (
                    <Permission key={index} permission={permission} refresh={refresh} />
                  ))}
                  <Permission refresh={refresh} />
                </SubPanelContent>
              </SubPanel>
            </Panel>
          )}
        </>
      )}
    />
  )
}

export default memo(PermissionPanel)