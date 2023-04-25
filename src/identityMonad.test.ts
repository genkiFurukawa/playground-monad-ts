import { ID } from './identityMonad';
import { succ, double, compose } from './util/util';

describe('恒等モナドのunit関数のテスト', () => {
    test('ID.unit(1)が1と同じになること', () => {
        expect(ID.unit(1))
        .toBe(1);
    });
});

describe('恒等モナドのflatMap関数のテスト', () => {
    test('ID.unit(1)にflatMap関数でsucc関数を適用した結果がsucc(1)と同じになること', () => {
        expect(ID.flatMap(ID.unit(1))((one) => {
            return ID.unit(succ(one));
        }))
        .toBe(succ(1));
    });

    test('恒等モナドのflatMap関数が関数合成と同じ機能を持つこと', () => {
        expect(ID.flatMap(ID.unit(1))((one) => {
            return ID.flatMap(ID.unit(succ(one)))((two) => {
                return ID.unit(double(two));
            })
        }))
        .toBe(compose(double, succ)(1));
    });
});

describe('恒等モナドのモナド則のテスト', () => {
    const instanceM = ID.unit(1);

    const f = (n: number) => {
        return ID.unit(-n);
    };

    const g = (n: number) => {
        return ID.unit(-n);
    };

    test('右単位原則のテスト', () => {
        expect(ID.flatMap(instanceM)(ID.unit))
        .toBe(instanceM);
    });

    test('左単位原則のテスト', () => {
        expect(ID.flatMap(ID.unit(1))(f))
        .toBe(f(1));
    });

    test('結合法則のテスト', () => {
        expect(ID.flatMap(ID.flatMap(instanceM)(f))(g))
        .toBe(ID.flatMap(instanceM)((x) => {
            return ID.flatMap(f(x))(g);
        }));
    });
});

