import { ISortable } from "."

export interface ITable  {
  headers: Array<{
    name: string, value: string, interactive: boolean
  }>,
  isLoading: boolean
}

export interface ISortableTable extends ITable, ISortable {}