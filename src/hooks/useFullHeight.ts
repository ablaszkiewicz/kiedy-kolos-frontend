import { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';

export default function useFullHeight() {
  const [locked, setLocked] = useState(false);
  const [height, setHeight] = useState(0);
  const vhHeight = use100vh()! - 1;

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!locked && vhHeight > 0) {
      setHeight(vhHeight);
      setLocked(true);
    }

    if (!isMobile) {
      setHeight(vhHeight);
    }
  }, [vhHeight]);

  return height;
}
