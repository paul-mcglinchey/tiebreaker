import { Link } from 'react-router-dom';
import { IPrompterProps } from '../../models';

const Prompter = ({ Icon, title, route }: IPrompterProps) => {

  return (
    <Link to={route} className="flex justify-center mt-32">
      <div className="flex bg-gray-800 text-3xl sm:text-5xl text-white font-extrabold p-4 rounded-lg transform hover:scale-105 transition-all text-center">
        <div className="inline-block">
          {title}
          <span className="inline-block align-middle">
            <Icon className="h-10 w-10 lg:h-12 lg:w-12 ml-2 md:ml-4 mb-2 hover:fill-current transition-all" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default Prompter;