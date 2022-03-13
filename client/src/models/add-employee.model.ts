import { DayOfWeek, EmployeeRole } from "./types";

export interface IAddEmployee {
  role?: EmployeeRole,
  reportsTo: string,
  name: {
    firstName: string,
    lastName: string,
    middleNames: string
  },
  address: {
    firstLine: string,
    secondLine: string,
    thirdLine: string,
    city: string,
    country: string,
    postCode: string
  } | undefined,
  contactInfo: {
    primaryPhoneNumber: string,
    primaryEmail: string,
    emails: string[],
    phoneNumbers: string[]
  },
  birthdate: string | undefined,
  startDate: string | undefined,
  minHours: number | undefined,
  maxHours: number | undefined,
  unavailableDays: DayOfWeek[],
  employeeColour: string | undefined
}