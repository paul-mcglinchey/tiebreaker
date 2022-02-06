import { useEffect } from 'react';

const useMountEffect = (cb, deps = []) => {
    // eslint-disable-next-line
    useEffect(cb, deps);
}

export default useMountEffect;