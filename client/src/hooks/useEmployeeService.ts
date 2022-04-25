import { IEmployee, IUseEmployeeService, Notification } from "../models";
import { generateColour } from "../services"
import { endpoints } from "../utilities";
import useRequestBuilder from "./useRequestBuilder";
import useNotification from "./useNotification";

const useEmployeeService = (refresh: () => void = () => {}): IUseEmployeeService => {
  
  const { addNotification } = useNotification()
  const { requestBuilder } = useRequestBuilder()

  const addEmployee = async (values: IEmployee, groupId: string | undefined) => {
    

    if (!groupId) return addNotification('Group must be set', Notification.Error);

    // generates a new random colour to be used for profile display
    values.colour = generateColour();

    fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully added employee', Notification.Success);
        } else {
          addNotification('A problem occurred adding employee', Notification.Error);
        }
      })
      .catch(() => {
        addNotification('A problem ocurred adding employee', Notification.Error);
      })
      .finally(() => {
        
        refresh();
      })
  }

  const deleteEmployee = async (employeeId: string | undefined, groupId: string | undefined) => {

    if (!employeeId || !groupId) return addNotification('Something went wrong...', Notification.Error);

    fetch(endpoints.employee(employeeId, groupId), requestBuilder('DELETE'))
      .then(res => {
        if (res.ok) {
          addNotification('Successfully deleted employee', Notification.Success);
        } else {
          addNotification('A problem occurred deleting employee', Notification.Error);
        }
      })
      .catch(() => {
        addNotification('A problem ocurred deleting employee', Notification.Error);
      })
      .finally(() => {
        refresh();
      })
  }

  const employeeService = { addEmployee, deleteEmployee }
  
  return { employeeService, addEmployee, deleteEmployee }
}

export default useEmployeeService