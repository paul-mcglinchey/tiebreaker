import { useEffect, useState } from "react";

const useRefresh = () => {
  
  let componentIsMounted = true;
  const [dependency, setDependency] = useState(false);
  const refresh = () => {
    if (componentIsMounted) setDependency(!dependency)
  }

  useEffect(() => {
    return () => {
      componentIsMounted = false;
    }
  })

  return { dependency, refresh };
}

export default useRefresh;