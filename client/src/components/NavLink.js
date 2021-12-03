import { Link } from 'react-router-dom';

const NavLink = (props) => {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const { link, title, item } = props;

  return (
    <Link
      to="/"
      className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
    >
      {title}
    </Link>
  )
}

export default NavLink;