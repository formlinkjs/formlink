import { describe, it, expect, beforeEach } from 'vitest';
import { Parser } from './parser';
import { makeError } from '@/support/helpers';
import { ErrorData } from '@/interfaces/exceptions/error-data';

describe('Parser', () => {
    let parser: Parser;

    beforeEach(() => {
        parser = new Parser();
    });

    it('should create an instance of Parser with default values', () => {
        expect(parser).instanceOf(Parser);
    });

    it('should be able to parse error responses', () => {
        const errors = {
            errors: {
                field1: ['Error 1', 'Error 2'],
                field2: ['Error 3'],
            }
        };

        const parsedErrors = Parser.parse(errors);

        expect(parsedErrors).toEqual([
            {
                field: 'field1',
                message: ['Error 1', 'Error 2'],
            },
            {
                field: 'field2',
                message: 'Error 3',
            }
        ]);
    });
});
