import { describe, it, expect, beforeEach } from 'vitest';
import { Parser } from './parser';

describe('Parser', () => {
    let parser: Parser;

    beforeEach(() => {
        parser = new Parser();
    });

    it('should create an instance of Parser with default values', () => {
        expect(parser).instanceOf(Parser);
    });
});
