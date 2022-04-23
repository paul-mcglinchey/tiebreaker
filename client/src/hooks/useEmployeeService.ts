import { IEmployee, IUseEmployeeService, Status } from "../models";
import { generateColour } from "../services"
import { endpoints } from "../utilities";
import useRequestBuilder from "./useRequestBuilder";
import useStatus from "./useStatus";

const useEmployeeService = (refresh: () => void = () => {}): IUseEmployeeService => {
  
  const { appendStatus, updateIsLoading } = useStatus()
  const { requestBuilder } = useRequestBuilder()

  const addEmployee = async (values: IEmployee, groupId: string | undefined) => {
    updateIsLoading(true);

    if (!groupId) return appendStatus(false, 'Group must be set', Status.Error);

    // generates a new random colour to be used for profile display
    values.colour = generateColour();

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
        updateIsLoading(false);
        refresh();
      })
  }

  const deleteEmployee = async (employeeId: string | undefined, groupId: string | undefined) => {

    if (!employeeId || !groupId) return appendStatus(false, 'Something went wrong...', Status.Error);

    fetch(endpoints.employee(employeeId, groupId), requestBuilder('DELETE'))
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