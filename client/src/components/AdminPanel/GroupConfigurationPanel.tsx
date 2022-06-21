import { IFetch, IGroup, IGroupsResponse } from '../../models'
import { Panel, SubPanel, SubPanelContent, } from '.'
import { Fetch } from '../Common'
import { useFetch, useRequestBuilder } from '../../hooks'
import { endpoints } from '../../config'

const GroupConfigurationPanel = () => {
  
  const { requestBuilder } = useRequestBuilder()
  
  return (
    <Fetch
      fetchOutput={useFetch(endpoints.allgroups, requestBuilder())}
      render={({ response }: IFetch<IGroupsResponse>) => (
        <Panel
          title="Group Configuration"
          subtitle={`Number of groups: ${response?.count}`}
          hideSave
        >
          {response && response.count > 0 && (
            <SubPanel>
              <SubPanelContent>
                {response.groups.map((group: IGroup, index: number) => (
                  <div key={index} className="text-lg font-semibold">
                    {group.name}
                  </div>
                ))}
              </SubPanelContent>
            </SubPanel>
          )}
        </Panel>
      )}
    />
  )
}

export default GroupConfigurationPanel