import { IEmployee, IEmployeeService, Notification } from "../models";
import { generateColour } from "../services"
import { endpoints } from "../utilities";
import useRequestBuilder from "./useRequestBuilder";
import useNotification from "./useNotification";
import useAsyncHandler from "./useAsyncHandler";

const useEmployeeService = (refresh: () => void = () => {}): IEmployeeService => {
  
  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()
  const { asyncHandler } = useAsyncHandler()

  const addEmployee = asyncHandler(async (values: IEmployee, groupId: string | undefined) => {
    if (!groupId) return addNotification('Group must be set', Notification.Error);

    const res = await fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, { ...values, colour: generateColour() }))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully created employee`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) {
      return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)
    }

    return addNotification(`${res.status}: A problem occurred creating employee`, Notification.Error)
  })

  const deleteEmployee = asyncHandler(async (employeeId: string | undefined, groupId: string | undefined) => {
    if (!employeeId || !groupId) return addNotification('Something went wrong...', Notification.Error);

    const res = await fetch(endpoints.employee(employeeId, groupId), requestBuilder('DELETE'))
    const json = await res.json()

    if (res.ok) {
      addNotification(`${res.status}: Successfully deleted employee`, Notification.Success)
      return refresh()
    }

    if (res.status < 500) {
      return addNotification(`${res.status}: ${json.message || res.statusText}`, Notification.Error)
    }

    return addNotification(`${res.status}: A problem occurred deleting employee`, Notification.Error)
  })
  
  return { addEmployee, deleteEmployee }
}

export default useEmployeeService