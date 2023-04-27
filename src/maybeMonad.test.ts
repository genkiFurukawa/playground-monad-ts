import { Maybe, maybe } from './maybeMonad';

describe('Maybeモナドのテスト', () => {
    const add = (maybeA, maybeB) => {
        return Maybe.flatMap(maybeA)((a) => {
            return Maybe.flatMap(maybeB)((b) => {
                return Maybe.unit(a + b);
            })
        });
    };

    const justOne = maybe.just(1);
    const justTwo = maybe.just(2);

    test('justしかないときに計算結果が返ってくること', () => {
        expect(Maybe.getOrElse(add(justOne, justOne))(null))
        .toBe(2);
    });

    test('nothingがあるときにnullが返ってくること', () => {
        expect(Maybe.getOrElse(add(justOne, maybe.nothing()))(null))
        .toBe(null);
    });
});