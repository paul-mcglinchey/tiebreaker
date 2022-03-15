import { useState } from "react";
import { IProps } from "../../../../models";
import { delay } from "../../../../services";

const ProgressBar = ({ setLoaded, progress }: IProps) => {

  const [scale, setScale] = useState("scale-x-0");

  const handleLoading = () => {
    delay(() => setScale("scale-x-50"), 0).delay(() => setScale("scale-x-100"), 500).delay(() => setLoaded(true), 600);
  }

  return (
    <div className="w-full h-2 bg-gray-300 flex rounded-md shadow-md">
      {progress < 100 && handleLoading()}
      <div className={`w-full h-full rounded-md bg-blue-500 origin-left transform ${scale} transition-all duration-500 ease-in-out`}></div>
    </div>
  )
}

export default ProgressBar;