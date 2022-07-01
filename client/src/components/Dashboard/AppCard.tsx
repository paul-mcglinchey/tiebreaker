import { Link } from "react-router-dom";
import { combineClassNames } from "../../services";

interface IAppCardProps {
  title: string,
  subtitle?: string | undefined,
  href: string,
  backgroundImage?: string | undefined
}

const AppCard = ({ title, subtitle, href, backgroundImage }: IAppCardProps) => {

  return (
    <Link to={href}>
      <div style={{ backgroundImage: `url(${backgroundImage})` }} className={combineClassNames(
        "h-full bg-auto bg-left rounded-xl shadow-md hover:scale-101 transition-transform"
      )}>
        <div className="w-full h-full flex flex-col px-12 py-8 rounded-xl">
          <div>
            <h1 className="text-5xl text-slate-200 text-left font-bold tracking-wide">{title}</h1>
            <hr className="mt-4 mb-2 border-b-2" />
            <span className="font-base text-white text-xl tracking-wide">{subtitle}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AppCard;