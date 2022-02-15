import { profileColours } from "..";

export const generateColour = () => {
  return profileColours[Math.floor(Math.random() * profileColours.length)];
}