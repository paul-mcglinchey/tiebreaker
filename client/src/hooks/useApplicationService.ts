import { endpoints } from "../config"
import { IApplication, IApplicationService } from "../models"
import { useAsyncHandler, useRequestBuilder } from '.'
import { useState } from "react"

const useApplicationService = (): IApplicationService => {
  
  const [loading, setLoading] = useState<boolean>(false)

  const { asyncReturnHandler } = useAsyncHandler()
  const { requestBuilder } = useRequestBuilder()

  const getApplications = asyncReturnHandler<IApplication[]>(async (groupId: string) => {
    setLoading(true)

    const res = await fetch(endpoints.applications(groupId), requestBuilder())
    const json: IApplication[] = await res.json()

    setLoading(false)

    return json
  })

  return { loading, getApplications }
}

export default useApplicationService