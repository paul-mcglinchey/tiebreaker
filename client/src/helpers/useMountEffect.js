import { useEffect } from "react"

export const useMountEffect = (cb, deps = []) => {
    // eslint-disable-next-line
    useEffect(cb, deps);
}