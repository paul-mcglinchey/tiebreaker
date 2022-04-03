import { IEmployee, Status } from "../models";
import { endpoints } from "../utilities";
import { generateColour } from "./colour.service";
import { IEmployeeService, IStatusService } from "./interfaces";
import { requestBuilder } from "./request.service";

export class EmployeeService implements IEmployeeService {
  statusService: IStatusService;
  refresh: () => void = () => {};

  constructor(statusService: IStatusService, refresh: () => void = () => {}) {
    this.statusService = statusService;
    this.refresh = refresh;
  }

  addEmployee = (values: IEmployee, groupId: string) => {
    this.statusService.setLoading();

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
  }
}