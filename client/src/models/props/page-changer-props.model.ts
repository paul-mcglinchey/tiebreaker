import { MouseEventHandler } from "react";

export interface IPageChangerProps {
  pageNumber: number,
  decreasePageNumber: () => MouseEventHandler,
  increasePageNumber: () => MouseEventHandler
}