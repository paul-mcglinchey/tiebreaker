export interface IAddClient {
  firstName: string,
  lastName: string,
  middleNames: string,
  email: string,
  phoneNumber: string,
  birthdate: string,
  addressLineOne: string,
  addressLineTwo: string,
  addressLineThree: string,
  city: string,
  country: string,
  postCode: string,
  groupName?: string,
  clientColour?: string | undefined
}