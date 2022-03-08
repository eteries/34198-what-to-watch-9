import { useEffect, useState } from 'react';

function useDelayedEffect(delay: number):[boolean, (isDoing: boolean) => void] {
  const [isStarted, setIsStarted] = useState(false);
  const [isDoing, setIsDoing] = useState(false);

  useEffect(() => {
    if (!isStarted) {
      setIsDoing(false);
      return;
    }

    const timerId = setTimeout(() => setIsDoing(true), delay);

    return () => {
      clearInterval(timerId);
    };

  }, [isStarted]);

  return [isDoing, setIsStarted];
}

export default useDelayedEffect;
