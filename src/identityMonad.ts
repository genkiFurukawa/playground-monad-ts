// 恒等モナドの定義
export const ID = {
    // unit:: T => ID[T]
    unit: <T, > (value: T) => {
        return value;
    },
    // flatMap:: ID[T] => FUN[T => ID[T]] => ID[T]
    flatMap: <T, > (instanceM: ReturnType<(value: T) => T>) => {
        return (transform: (value: T) => T) => {
            return transform(instanceM);
        }
    }
};
