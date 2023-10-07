import { Handler } from './handler';
import { describe, expect, test, beforeEach } from 'vitest';
import { makeError } from './../support/helpers';
import { ErrorObject } from './error-object';

describe('Handler', () => {
    let handler: Handler;

    beforeEach(() => {
        // Initialize a new Handler instance before each test
        handler = new Handler();
    });

    test('should create a new instance of Handler', () => {
        expect(handler).toBeInstanceOf(Handler);
    });

    test('should return the first error message for a given field', () => {
        // Add test data to the handler's errors property
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        expect(handler.get('field1')).toBe('Error 1');
        expect(handler.get('field2')).toBe('Error 3');
        expect(handler.get('nonexistentField')).toBeUndefined();
    });

    test('should return the first raw error object for a given field', () => {
        // Add test data to the handler's errors property
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        expect(handler.getRaw('field1')?.message).toEqual(['Error 1', 'Error 2']);
        expect(handler.getRaw('field1')?.message).toBeTypeOf('object');
        expect(handler.getRaw('field2')?.message).toBe('Error 3');
        expect(handler.getRaw('nonexistentField')?.message).toBeUndefined();
    });

    test('should return all error messages for a given field', () => {
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        expect(handler.getAll('field1')).toEqual(['Error 1', 'Error 2']);
        expect(handler.getAll('field2')).toEqual(['Error 3']);
        expect(handler.getAll('nonexistentField')).toEqual([]);
    });

    test('should determine if a field has an error', () => {
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        expect(handler.has('field1')).toBe(true);
        expect(handler.has('field2')).toBe(true);
        expect(handler.has('nonexistentField')).toBe(false);
    });

    test('should flatten all error messages', () => {
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        expect(handler.flatten()).toEqual(['Error 1', 'Error 2', 'Error 3']);
    });

    test('should return all errors as an array', () => {
        const errors = {
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        };

        handler.record(makeError(errors));

        expect(handler.all().length).toBe(2);
        expect(handler.all()[0]).toBeInstanceOf(ErrorObject);
        expect(handler.all()[0].field).toBe('field1');
        expect(handler.all()[0].message).toEqual(errors.field1);
        expect(handler.all()[1].field).toBe('field2');
        expect(handler.all()[1].message).toEqual(errors.field2[0]);
    });

    test('should record new error messages', () => {
        const newErrors = {
            field1: ['New Error'],
            field2: ['Another Error'],
        };

        handler.record(makeError(newErrors));

        expect(handler.all().length).toEqual(2);
    });

    test('should clear error messages for a specific field', () => {
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        handler.clear('field1');

        expect(handler.get('field1')).toBeUndefined();
        expect(handler.getAll('field1')).toEqual([]);
        expect(handler.get('field2')).toBe('Error 3');
    });

    test('should clear all error messages', () => {
        handler.record(makeError({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        }));

        handler.clear();

        expect(handler.any()).toBe(false);
        expect(handler.all()).toEqual([]);
    });

    test('should determine if any error messages are available', () => {
        expect(handler.any()).toBe(false);

        handler.record(makeError({
            field1: ['Error 1'],
        }));

        expect(handler.any()).toBe(true);
    });

    test('should set and get the error status code', () => {
        handler.setStatusCode(404);

        expect(handler.getStatusCode()).toBe(404);
    });
});
