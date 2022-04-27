import { Link } from "react-router-dom";
import { combineClassNames } from "../../../services";

interface IGradient {
  from: string,
  to?: string,
  via?: string
}
interface IAppCardProps {
  title: string,
  subtitle: string,
  href: string,
  datapoints: {
    title: string,
    value: number
  }[],
  colours?: string | IGradient
}

const AppCard = ({ title, subtitle, href, datapoints, colours }: IAppCardProps) => {

  return (
    <Link className="flex-grow" to={href}>
      <div className={combineClassNames(
        "flex flex-col h-full space-y-4 bg-gradient-to-b text-white px-8 py-5 shadow-lg rounded-lg transform hover:scale-102 transition-transform",
        colours
          ? typeof colours === "string"
            ? `from-${colours}`
            : `${colours.from} ${colours.to && colours.to} ${colours.via && colours.via}`
          : "from-orange-500 to-red-500"
      )}>
        <div>
          <h1 className="text-4xl text-left font-black tracking-wide">{title}</h1>
          <hr className="mt-4 border-b-2" />
        </div>
        <div className="flex flex-col space-y-4 font-bold">
          <div>
            {subtitle}
          </div>
          <div className="flex space-x-4">
            {datapoints && datapoints.map((datapoint: { title: string, value: number }, i: number) => (
              <div key={i}>
                <span className="text-2xl font-extrabold mr-1">{datapoint.value}</span>
                <span> {datapoint.title}{(datapoint.value > 1 || datapoint.value === 0) && 's'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AppCard;