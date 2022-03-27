export const mapToUniqueKeys = (
  arr: {[key: string]: any}[],
  key: string,
  initialValue = '',
): string[] => (
  arr
    .map((item) => item[key])
    .reduce((uniqueKeys: string[], current) => {
      if (!uniqueKeys.includes(current)) {
        uniqueKeys.push(current);
      }
      return uniqueKeys;
    }, [initialValue])
);

export const splitArray = <T>(arr: T[]):T[][] => {
  if (arr.length < 2) {
    return [arr, []];
  }

  const middleElem = Math.ceil(arr.length / 2);

  return [arr.slice(0, middleElem), arr.slice((middleElem))]
}
