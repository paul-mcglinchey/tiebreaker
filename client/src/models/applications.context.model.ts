import { Dispatch, SetStateAction } from "react"
import { IApplication } from "."

export interface IApplicationsContext {
  applications: IApplication[]
  setApplications: Dispatch<SetStateAction<IApplication[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
}