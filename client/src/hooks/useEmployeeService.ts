import { useContext } from "react";
import { IEmployee, IEmployeeService } from "../models";
import { generateColour } from "../services"
import { EmployeeContext } from "../contexts";
import { useRequestBuilder, useAsyncHandler, useResolutionService } from '../hooks'
import { endpoints } from '../config'
import useGroupService from "./useGroupService";

const useEmployeeService = (): IEmployeeService => {
  
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()
  const { handleResolution } = useResolutionService()

  const { groupId } = useGroupService()

  const employeeContext = useContext(EmployeeContext)
  const { getEmployees, setEmployees } = employeeContext

  const getEmployee = (employeeId: string | undefined): IEmployee | undefined => {
    return getEmployees().find((employee: IEmployee) => employee._id === employeeId)
  }

  const addEmployee = asyncHandler(async (values: IEmployee) => {
    if (!groupId) throw new Error()

    const res = await fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, { ...values, colour: generateColour() }))
    const json = await res.json()

    handleResolution(res, json, 'create', 'employee', [() => addEmployeeInContext(json)])
  })

  const updateEmployee = asyncHandler(async (employeeId: string | undefined, values: IEmployee) => {
    if (!employeeId || !groupId) throw new Error()

    const res = await fetch(endpoints.employee(employeeId, groupId), requestBuilder('PUT', undefined, { ...values }))
    const json = await res.json()

    handleResolution(res, json, 'update', 'employee', [() => updateEmployeeInContext(employeeId, json)])
  })

  const deleteEmployee = asyncHandler(async (employeeId: string | undefined) => {
    if (!employeeId) throw new Error()

    const res = await fetch(endpoints.employee(employeeId, groupId), requestBuilder('DELETE'))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'employee', [() => removeEmployeeFromContext(employeeId)])
  })

  const addEmployeeInContext = (employee: IEmployee) => {
    setEmployees(employees => [...employees, employee])
  }

  const removeEmployeeFromContext = (employeeId: string) => {
    setEmployees(employees => employees.filter(e => e._id !== employeeId))
  }

  const updateEmployeeInContext = (employeeId: string, values: IEmployee) => {
    setEmployees(employees => {
      return employees.map(e => e._id === employeeId ? values : e)
    })
  }
  
  return { ...employeeContext, getEmployee, addEmployee, updateEmployee, deleteEmployee }
}

export default useEmployeeService