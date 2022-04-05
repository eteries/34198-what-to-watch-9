import { useEffect, useState } from 'react';

function UseShowMore<T>(arr: T[], chunkSize: number): [T[], boolean, ()=> void] {
  const [index, setCurrentIndex] = useState<number>(chunkSize);
  const [isButtonShown, setIsButtonShown] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<T[]>([]);

  const showMore = () => {
    if (index > arr.length) {
      setIsButtonShown(false);
      setVisibleItems([...arr]);
      return;
    }
    setVisibleItems(arr.slice(0, index));
    setIsButtonShown(true);
    setCurrentIndex(index + chunkSize);
  };

  useEffect(() => {
    showMore();

    return () => setCurrentIndex(chunkSize);
  },[arr]);

  return [visibleItems, isButtonShown, showMore];
}

export default UseShowMore;
