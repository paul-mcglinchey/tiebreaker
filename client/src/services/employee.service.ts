import { IEmployee, Status } from "../models";
import { endpoints } from "../utilities";
import { generateColour } from "./colour.service";
import { IEmployeeService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class EmployeeService implements IEmployeeService {
  statusService: IStatusService;
  refresh: () => void;

  constructor(statusService: IStatusService, refresh: () => void) {
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addEmployee = async (values: IEmployee, groupId: string) => {

    // generates a new random colour to be used for profile display
    values.employeeColour = generateColour();

    fetch(endpoints.employees(groupId), requestBuilder('POST', undefined, values))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, 'Successfully added employee', Status.Success);
        } else {
          this.statusService.appendStatus(false, 'A problem occurred adding employee', Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, 'A problem ocurred adding employee', Status.Error);
      })
      .finally(() => {
        this.refresh();
      })
  }

  deleteEmployee = async (employeeId: string | undefined, groupId: string | undefined) => {

    if (!employeeId || !groupId) return this.statusService.appendStatus(false, 'Both an employee ID and group ID are required', Status.Error);

    fetch(endpoints.employee(employeeId), requestBuilder('DELETE', undefined, { groupId: groupId }))
      .then(res => {
        if (res.ok) {
          this.statusService.appendStatus(false, 'Successfully deleted employee', Status.Success);
        } else {
          this.statusService.appendStatus(false, 'A problem occurred deleting employee', Status.Error);
        }
      })
      .catch(() => {
        this.statusService.appendStatus(false, 'A problem ocurred deleting employee', Status.Error);
      })
      .finally(() => {
        this.refresh();
      })
  }
}