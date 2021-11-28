import { useEffect } from "react"

export const useMountEffect = (cb, deps = []) => {
    useEffect(cb, deps);
}