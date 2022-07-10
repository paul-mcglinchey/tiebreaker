import { Dispatch, SetStateAction } from "react"
import { IApplication } from "../../models"

export interface IApplicationContext {
  applications: IApplication[] | undefined
  setApplications: Dispatch<SetStateAction<IApplication[] | undefined>>
  count: number
  setCount: Dispatch<SetStateAction<number>>
  isLoading: boolean
}