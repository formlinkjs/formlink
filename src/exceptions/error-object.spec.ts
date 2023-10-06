import { describe, it, expect, beforeEach } from 'vitest';
import { ErrorObject } from './error-object';

describe('ErrorObject', () => {
    let error: ErrorObject;

    beforeEach(() => {
        error = new ErrorObject('foo', 'bar');
    });

    it('should create an instance of ErrorObject with default values', () => {
        expect(error).instanceOf(ErrorObject);
    });
});
