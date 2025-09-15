import { useEffect, useState } from 'react'

const useScreenType = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < breakpoint);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useScreenType
