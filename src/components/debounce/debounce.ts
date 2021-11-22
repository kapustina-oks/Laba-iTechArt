export const debounce = <T>(
  fn: (...args: T[]) => void,
  ms: number,
  onLoading: { (load: boolean): void; (arg0: boolean): void }
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: T, ...args: T[]) {
    onLoading(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
