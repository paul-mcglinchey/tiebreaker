import { Dispatch, SetStateAction } from "react"
import { IApplication } from "."

export interface IApplicationContext {
  applications: IApplication[]
  setApplications: Dispatch<SetStateAction<IApplication[]>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
}