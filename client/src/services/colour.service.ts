import { profileColours } from "../utilities";

export const generateColour = (): string | undefined => {
  return profileColours[Math.floor(Math.random() * profileColours.length)] || profileColours[0] || undefined;
}