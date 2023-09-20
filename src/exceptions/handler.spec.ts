import { Handler } from './handler';
import { describe, expect, test, beforeEach } from 'vitest';

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
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        expect(handler.get('field1')).toBe('Error 1');
        expect(handler.get('field2')).toBe('Error 3');
        expect(handler.get('nonexistentField')).toBeUndefined();
    });

    test('should return all error messages for a given field', () => {
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        expect(handler.getAll('field1')).toEqual(['Error 1', 'Error 2']);
        expect(handler.getAll('field2')).toEqual(['Error 3']);
        expect(handler.getAll('nonexistentField')).toEqual([]);
    });

    test('should determine if a field has an error', () => {
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        expect(handler.has('field1')).toBe(true);
        expect(handler.has('field2')).toBe(true);
        expect(handler.has('nonexistentField')).toBe(false);
    });

    test('should flatten all error messages', () => {
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        expect(handler.flatten()).toEqual(['Error 1', 'Error 2', 'Error 3']);
    });

    test('should return all errors as an object', () => {
        const errors = {
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        };

        handler.record(errors);

        expect(handler.all()).toEqual(errors);
    });

    test('should record new error messages', () => {
        const newErrors = {
            field1: ['New Error'],
            field2: ['Another Error'],
        };

        handler.record(newErrors);

        expect(handler.all()).toEqual(newErrors);
    });

    test('should clear error messages for a specific field', () => {
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        handler.clear('field1');

        expect(handler.get('field1')).toBeUndefined();
        expect(handler.getAll('field1')).toEqual([]);
        expect(handler.get('field2')).toBe('Error 3');
    });

    test('should clear all error messages', () => {
        handler.record({
            field1: ['Error 1', 'Error 2'],
            field2: ['Error 3'],
        });

        handler.clear();

        expect(handler.any()).toBe(false);
        expect(handler.all()).toEqual({});
    });

    test('should determine if any error messages are available', () => {
        expect(handler.any()).toBe(false);

        handler.record({
            field1: ['Error 1'],
        });

        expect(handler.any()).toBe(true);
    });
});

