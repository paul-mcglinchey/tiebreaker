import { PyrobooksIcon } from ".."

const IconWrapper = ({ children }) => {
  return (
    <div className="relative max-w-login h-screen mx-auto">
      <PyrobooksIcon className="w-full h-auto text-gray-300 relative top-4"/>
      {children}
    </div>
  )
}

export default IconWrapper;