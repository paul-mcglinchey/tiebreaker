import { Link } from "react-router-dom";

interface IAppCardProps {
  title: string,
  subtitle: string,
  href: string,
  datapoints: {
    title: string,
    value: number
  }[]
}

const AppCard = ({ title, subtitle, href, datapoints }: IAppCardProps) => {
  return (
    <Link className="flex-grow" to={href}>
      <div className="flex flex-col h-full space-y-4 bg-gray-800 text-blue-300 px-8 py-5 shadow-lg rounded-lg transform hover:scale-102 transition-transform">
        <div>
          <h1 className="text-4xl text-left font-semibold tracking-wide">{title}</h1>
          <hr className="mt-4 border-gray-700" />
        </div>
        <div className="flex flex-col space-y-4 text-gray-300">
          <div>
            {subtitle}
          </div>
          <div className="flex space-x-4">
            {datapoints && datapoints.map((datapoint: { title: string, value: number }, i: number) => (
              <div key={i}>
                <span className="text-2xl font-bold">{datapoint.value}</span>
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