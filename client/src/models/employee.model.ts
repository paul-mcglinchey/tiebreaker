import { DayOfWeek, EmployeeRole } from "./types";

export interface IEmployee {
  _id: string,
  role: EmployeeRole,
  reportsTo: String,
  name: {
    firstName: String,
    lastName: String,
    middleNames: String[]
  },
  address: {
    firstLine: String,
    secondLine: String,
    thirdLine: String,
    city: String,
    country: String,
    postCode: String
  } | undefined,
  contactInfo: {
    primaryPhoneNumber: String,
    primaryEmail: String,
    emails: String[],
    phoneNumbers: String[]
  },
  birthdate: Date | undefined,
  startDate: Date | undefined,
  minHours: Date | undefined,
  maxHours: Date | undefined,
  unavailableDays: DayOfWeek[],
  holidays: {
    startDate: Date,
    endDate: Date,
    isPaid: boolean
  }[],
  employeeColour: string
}