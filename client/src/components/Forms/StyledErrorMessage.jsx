const StyledErrorMessage = (props) => {
  return (
    <div className="text-red-500 uppercase font-bold text-opacity-80 text-sm">
      <span className="inline-block align-middle">
        {props.children}
      </span>
    </div>
  )
}

export default StyledErrorMessage;