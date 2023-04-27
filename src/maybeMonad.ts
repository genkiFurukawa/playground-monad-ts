interface Patterm {
    just(value: any): any;
    nothing(): any;
}

export const maybe = {
    match: (exp: any, pattern: Patterm) => {
        console.log(exp);
        return exp.call(pattern, pattern);
    },
    just: (value: any) => {
        return (pattern: Patterm) => {
            return pattern.just(value);
        };
    },
    nothing: () => {
        return (pattern: Patterm) => {
            return pattern.nothing();
        };
    }
}
// Maybeモナドの定義
export const Maybe = {
    // unit:: T => MAYBE[T]
    unit: <T,> (value: T) => {
        return maybe.just(value);
    },
    // flatMap:: MAYBE[T] => FUN[T => MAYBE[U]] => MAYBE[U]
    flatMap: (instanceM: any) => {
        return (transform: any) => {
            return maybe.match(instanceM, {
                just: (value) => {
                    return transform(value);
                },
                nothing: () => {
                    return maybe.nothing();
                }
            });
        };
    },
    // ヘルパー関数
    // Maybeモナドのインスタンスがmaybe.just(value)の場合にvalueを返し、
    // maybe.nothing()の場合には第2引数で指定された値を返す
    getOrElse: (instanceM: any) => {
        return (alternate: any) => {
            return maybe.match(instanceM, {
                just: (value) => {
                    return value;
                },
                nothing: () => {
                    return alternate;
                }
            });
        };
    }
};