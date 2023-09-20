import { describe, it, expect, beforeEach } from 'vitest';
import { Form } from './form';

describe('Form', () => {
    let form: Form;

    beforeEach(() => {
        form = new Form();
    });

    it('should create an instance of Form with default values', () => {
        expect(form).instanceOf(Form);
    });
});
