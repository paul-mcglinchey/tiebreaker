import { IEmployee, IUseEmployeeService, Status } from "../models";
import { generateColour } from "../services"
import { endpoints } from "../utilities";
import useRequestBuilder from "./useRequestBuilder";
import useStatus from "./useStatus";

const useEmployeeService = (refresh: () => void = () => {}): IUseEmployeeService => {
  
  const { appendStatus } = useStatus()
  const { requestBuilder } = useRequestBuilder()

  const addEmployee = async (values: IEmployee, groupId: string) => {

    // generates a new random colour to be used for profile display
    values.employeeColour = generateColour();

    fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          appendStatus(false, 'Successfully added employee', Status.Success);
        } else {
          appendStatus(false, 'A problem occurred adding employee', Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, 'A problem ocurred adding employee', Status.Error);
      })
      .finally(() => {
        refresh();
      })
  }

  const deleteEmployee = async (employeeId: string | undefined, groupId: string | undefined) => {

    if (!employeeId || !groupId) return appendStatus(false, 'Both an employee ID and group ID are required', Status.Error);

    fetch(endpoints.employee(employeeId), requestBuilder('DELETE', undefined, { groupId: groupId }))
      .then(res => {
        if (res.ok) {
          appendStatus(false, 'Successfully deleted employee', Status.Success);
        } else {
          appendStatus(false, 'A problem occurred deleting employee', Status.Error);
        }
      })
      .catch(() => {
        appendStatus(false, 'A problem ocurred deleting employee', Status.Error);
      })
      .finally(() => {
        refresh();
      })
  }

  const employeeService = { addEmployee, deleteEmployee }
  
  return { employeeService, addEmployee, deleteEmployee }
}

export default useEmployeeService