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
