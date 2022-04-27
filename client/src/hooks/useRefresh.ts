import { useState } from "react";

const useRefresh = (callbacks: (() => void)[] = []) => {
  const [dependency, setDependency] = useState(false);
  const refresh = () => {
    setDependency(!dependency)

    callbacks.forEach((cb: () => void) => cb())
  }

  return { dependency, refresh };
}

export default useRefresh;