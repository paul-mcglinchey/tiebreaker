import { useEffect, useState } from "react";

const useDelayedRendering = (delay: number): boolean => {
  
  const [show, setShow] = useState(false);

  useEffect(() => {
    let componentIsMounted = true;
    
    setTimeout(() => {
      if (componentIsMounted) setShow(true);
    }, delay)

    return () => {
      componentIsMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return show;
}

export default useDelayedRendering;