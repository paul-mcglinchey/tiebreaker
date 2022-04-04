import { IProps } from "../../../models"

const DataPoint = ({ value, label }: IProps) => {
  return (
    <div className="flex items-end space-x-2">
      <span className="text-8xl font-bold">{value}</span>
      <span className="font-bold opacity-50">{label}{value === 0 || value > 1 && 's'}</span>
    </div>
  )
}

export default DataPoint;