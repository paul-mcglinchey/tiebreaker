import { useFetch, useRefresh, useRequestBuilder } from '../../hooks'
import { IApplication, IApplicationsResponse, IFetch } from '../../models'
import { endpoints } from '../../config'
import { Fetch } from '../Common'
import { Panel, SubPanel, SubPanelContent, Application } from '.'

const ApplicationPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { refresh, dependency } = useRefresh()

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.applications, requestBuilder(), [dependency])}
      render={({ response, isLoading }: IFetch<IApplicationsResponse>) => (
        <>
          {!isLoading && response && (
            <Panel 
              title="Applications" 
              subtitle={`Number of applications: ${response.count}`} 
              hideSave
            >
              <SubPanel>
                <SubPanelContent>
                  {response.applications.map((application: IApplication, index: number) => (
                    <Application key={index} application={application} refresh={refresh} />
                  ))}
                  <Application refresh={refresh} />
                </SubPanelContent>
              </SubPanel>
            </Panel>
          )}
        </>
      )}
    />
  )
}

export default ApplicationPanel