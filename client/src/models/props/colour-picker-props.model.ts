export interface IColourPickerProps {
  colour: string,
  setColour: (colour: string) => void,
  menuSide?: "LEFT" | "RIGHT",
  hideIcon?: boolean,
  square?: boolean
}