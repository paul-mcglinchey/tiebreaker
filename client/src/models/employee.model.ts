import { DayOfWeek, EmployeeRole } from "./types";

export interface IEmployee {
  _id?: string,
  role?: EmployeeRole,
  reportsTo?: string,
  name: {
    firstName: string,
    lastName: string,
    middleNames?: string
  },
  address?: {
    firstLine?: string,
    secondLine?: string,
    thirdLine?: string,
    city?: string,
    country?: string,
    postCode?: string
  },
  contactInfo: {
    primaryPhoneNumber?: string,
    primaryEmail: string,
    emails?: string[],
    phoneNumbers?: string[]
  },
  birthdate?: string,
  startDate?: string,
  minHours?: string,
  maxHours?: string,
  unavailableDays?: DayOfWeek[],
  holidays?: {
    startDate?: string,
    endDate?: string,
    isPaid?: boolean
  }[],
  employeeColour?: string
}