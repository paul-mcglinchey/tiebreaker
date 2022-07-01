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

  const { currentGroup } = useGroupService()

  const employeeContext = useContext(EmployeeContext)
  const { employees, setEmployees } = employeeContext

  const getEmployee = (employeeId: string | undefined): IEmployee | undefined => {
    return employees.find((e) => e._id === employeeId)
  }

  const addEmployee = asyncHandler(async (values: IEmployee) => {
    if (!currentGroup?._id) throw new Error()

    const res = await fetch(endpoints.employees(currentGroup._id), requestBuilder('POST', undefined, { ...values, colour: generateColour() }))
    const json = await res.json()

    handleResolution(res, json, 'create', 'employee', [() => addEmployeeInContext(json)])
  })

  const updateEmployee = asyncHandler(async (employeeId: string | undefined, values: IEmployee) => {
    if (!employeeId || !currentGroup?._id) throw new Error()

    const res = await fetch(endpoints.employee(employeeId, currentGroup._id), requestBuilder('PUT', undefined, { ...values }))
    const json = await res.json()

    handleResolution(res, json, 'update', 'employee', [() => updateEmployeeInContext(employeeId, json)])
  })

  const deleteEmployee = asyncHandler(async (employeeId: string | undefined) => {
    if (!employeeId || !currentGroup?._id) throw new Error()

    const res = await fetch(endpoints.employee(employeeId, currentGroup?._id), requestBuilder('DELETE'))
    const json = await res.json()

    handleResolution(res, json, 'delete', 'employee', [() => deleteEmployeeInContext(employeeId)])
  })

  const addEmployeeInContext = (employee: IEmployee) => {
    setEmployees(employees => [...employees, employee])
  }

  const deleteEmployeeInContext = (employeeId: string) => {
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