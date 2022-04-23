import { useState } from "react";

const useRefresh = () => {
  const [dependency, setDependency] = useState(false);
  const refresh = () => {
    setDependency(!dependency)
  }

  return { dependency, refresh };
}

export default useRefresh;