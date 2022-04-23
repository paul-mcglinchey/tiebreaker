import { IProps } from "../../../models"
import { numberParser } from "../../../services";

const DataPoint = ({ value, label }: IProps) => {
  
  value = Number.parseInt(value);

  return (
    <div className="flex items-end space-x-2">
      <span className="text-8xl font-bold">{numberParser(value)}</span>
      <span className="font-bold opacity-50">{label}{(!value || value > 1) ? 's' : ''}</span>
    </div>
  )
}

export default DataPoint;