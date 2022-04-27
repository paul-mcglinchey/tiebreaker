import { IEmployee, IEmployeeService } from "../models";
import { generateColour } from "../services"
import { EmployeeContext, endpoints } from "../utilities";
import useRequestBuilder from "./useRequestBuilder";
import useAsyncHandler from "./useAsyncHandler";
import { useContext } from "react";
import useResolutionService from "./useResolutionService";

const useEmployeeService = (): IEmployeeService => {
  
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const employeeContext = useContext(EmployeeContext)
  const { getEmployees, refresh } = employeeContext

  const getEmployee = (employeeId: string): IEmployee | undefined => {
    return getEmployees().find((employee: IEmployee) => employee._id === employeeId)
  }

  const addEmployee = asyncHandler(async (values: IEmployee, groupId: string | undefined) => {
    if (!groupId) throw new Error()

    const res = await fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, { ...values, colour: generateColour() }))
    const json = await res.json()

    handleResolution(res, json, 'create', 'employee', [() => refresh()])
  })

  const deleteEmployee = asyncHandler(async (employeeId: string | undefined, groupId: string | undefined) => {
    if (!employeeId || !groupId) throw new Error()

    const res = await fetch(endpoints.employee(employeeId, groupId), requestBuilder('DELETE'))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'employee', [() => refresh()])
  })
  
  return { ...employeeContext, getEmployee, addEmployee, deleteEmployee }
}

export default useEmployeeService