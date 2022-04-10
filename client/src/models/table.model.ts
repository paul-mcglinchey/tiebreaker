import { ISortable } from "./sortable.model";

export interface ITable extends ISortable {
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}