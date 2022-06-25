import { memo, useState } from 'react'
import { useFetch, useRefresh, useRequestBuilder } from '../../hooks'
import { IFetch, IPermissionsResponse, SortDirection } from '../../models'
import { endpoints } from '../../config'
import { Fetch, Table } from '../Common'
import { Panel, PermissionTableRow } from '.'

const PermissionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { dependency } = useRefresh()

  const headers = [
    { name: 'Identifer', value: 'identifier', interactive: true },
    { name: 'Name', value: 'name', interactive: true },
    { name: 'Description', value: 'description', interactive: true },
    { name: 'Language', value: 'language', interactive: true },
    { name: 'Type', value: 'type', interactive: true },
    { name: 'Options', value: 'options', interactive: false },
  ]

  const [sortField, setSortField] = useState<string>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

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
              <Table
                headers={headers}
                isLoading={isLoading}
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
              >
                <>
                  {response.permissions.map((p, i) => (
                    <PermissionTableRow key={i} permission={p} />
                  ))}
                  <PermissionTableRow />
                </>
              </Table>
            </Panel>
          )}
        </>
      )}
    />
  )
}

export default memo(PermissionPanel)