import { profileColours } from "..";

export const generateColour = async () => {
  return profileColours[Math.floor(Math.random() * profileColours.length)];
}