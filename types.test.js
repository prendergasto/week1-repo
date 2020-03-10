const {
    isNumber,
    isString,
    isBoolean,
    isArray,
    isObject,
    isFunction,
    castToNumber,
    getCaster
} = require('./types.js');

describe('validator module', () => {
    describe('basic validation', () => {
        it('properly tells if a value is a string', () => {
            expect(isString('hello')).toBeTruthy();
            expect(isString(3)).toBeFalsy();
            expect(isString({})).toBeFalsy();
            expect(isString('words')).toBeTruthy();
            expect(isString('365')).toBeTruthy();
            expect(isString([])).toBeFalsy();
        });

        it('properly tells if a value is a numbers', () => {
            expect(isNumber(3)).toBeTruthy();
            expect(isNumber('hi')).toBeFalsy();
            expect(isNumber([])).toBeFalsy();
            expect(isNumber({})).toBeFalsy();
            expect(isNumber(() => {})).toBeFalsy();
            expect(isNumber(true)).toBeFalsy();
        });

        it('properly tells if a value is a boolean', () => {
            expect(isBoolean(true)).toBeTruthy();
            expect(isBoolean(false)).toBeTruthy();
            expect(isBoolean('true')).toBeFalsy();
            expect(isBoolean(1)).toBeFalsy();
            expect(isBoolean({})).toBeFalsy();
            expect(isBoolean([])).toBeFalsy();
        });

        it('properly tells if a value is an Array', () => {
            expect(isArray([1, 2, 3])).toBeTruthy();
            expect(isArray(['is', 'this', 'array?'])).toBeTruthy();
            expect(isArray([])).toBeTruthy();
            expect(isArray({})).toBeFalsy();
            expect(isArray('hello')).toBeFalsy();
            expect(isArray(365)).toBeFalsy();
        });

        it('properly tells if a value is an Object', () => {
            expect(isObject({})).toBeTruthy();
            expect(isObject({ key: 2, is_item: 'sure' })).toBeTruthy();
            expect(isObject({ isCool: true, howCool: 'so cool' })).toBeTruthy();
            expect(isObject([])).toBeFalsy();
            expect(isObject('words')).toBeFalsy();
            expect(isObject(true)).toBeFalsy();
            expect(isObject(123)).toBeFalsy();
        });

        it('properly tells if a value is a Function', () => {
            expect(isFunction(isNumber)).toBeTruthy();
            expect(isFunction(isString)).toBeTruthy();
            expect(isFunction(isArray)).toBeTruthy();
            expect(isFunction(isObject)).toBeTruthy();
            expect(isFunction(isBoolean)).toBeTruthy();
            expect(isFunction(123)).toBeFalsy();
            expect(isFunction('words')).toBeFalsy();
            expect(isFunction({})).toBeFalsy();
            expect(isFunction([])).toBeFalsy();
        
});


    });

    describe('casters', () => {
        it('can cast values to a number', () => {
            expect(castToNumber(3)).toEqual(3);
            expect(castToNumber('3')).toEqual(3);
            expect(castToNumber(true)).toEqual(1);
            expect(castToNumber(false)).toEqual(0);
        });

        it('throws if value is not castable to number', () => {
            expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
            expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
        });
    });

    it('can get the right caster', () => {
        expect(getCaster(Number)).toEqual(castToNumber);
        expect(getCaster(Promise)).toBeNull();
    });
});
