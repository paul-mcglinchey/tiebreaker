import { IProps } from "../../../models"

const DataPoint = ({ value, label }: IProps) => {
  return (
    <div>
      <span className="text-8xl font-bold">{value}</span>
      <span className="font-bold">{label}</span>
    </div>
  )
}

export default DataPoint;