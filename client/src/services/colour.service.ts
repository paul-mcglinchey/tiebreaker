import { profileColours } from "../utilities";

export const generateColour = (): string => {
  return profileColours[Math.floor(Math.random() * profileColours.length)];
}