export const debounce = <T>(fn: (...args: T[]) => void, ms: number): ((...args: T[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      clearTimeout(timeoutId);
    }, ms);
  };
};
