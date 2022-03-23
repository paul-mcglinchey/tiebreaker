import { useEffect, useState } from "react";
import { IProps } from "../../../../models";

const ProgressBar = ({ loaded }: IProps) => {

  const [height, setHeight] = useState('h-0.5');

  useEffect(() => {
    loaded >= 100 && (
      setTimeout(() => setHeight('h-0'), 2000)
    )
  })

  return (
    <div className={`${height} bg-gray-300 flex shadow-md`}>
      <div style={{ 'transform': `scaleX(${loaded / 100})` }} className={`w-full h-full bg-blue-500 origin-left transform transition-all duration-500 ease-in-out`}></div>
    </div>
  )
}

export default ProgressBar;