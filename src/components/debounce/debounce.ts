
export const debounce = (fn: (...args: T[]), ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: T, ...args: T[]) {
    //onLoading(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
