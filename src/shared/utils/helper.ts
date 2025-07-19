 export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: number;
  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  }
}