const SpinnerSVG = (props) => {
  return (
    <div>
      <svg viewBox="0 0 48 48" className="stroke-current animate-spin ease-in-out">
        <path
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className="opacity-100"
          id="path906"
          d="M 38.853753,38.929435 A 20.91968,20.91968 0 0 0 45.018874,24.098196 20.91968,20.91968 0 0 0 38.889222,9.3071687" />
        <circle
          fill="none"
          strokeWidth="6"
          className="opacity-30"
          id="path833"
          cx="24.098196"
          cy="24.098196"
          r="20.91968" />
      </svg>
    </div>
  )
}

export default SpinnerSVG;
