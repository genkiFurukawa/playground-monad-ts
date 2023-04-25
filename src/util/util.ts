export const succ = (n: number): number => {
    return n + 1;
};

export const double = (n: number): number => {
    return n * 2;
};

export const compose = <T,>(f: (x: T) => T, g: (x: T) => T) => {
    return (arg: T) => {
      return f(g(arg));
    }
};
