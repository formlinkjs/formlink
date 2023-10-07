import { describe, it, expect } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Form } from './form';

describe('Form', () => {
    it('can be instantiated properties', () => {
        const form = new Form({});

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeFalsy();
        expect(form.isRecentlySuccessful()).toBeFalsy();
    });

    it('should have customizable options', () => {
        const form = new Form({}, { resetOnSuccess: true });
        const options = form.getOptions();

        expect(options.resetOnSuccess).toBe(true);

        form.setOptions({ resetOnSuccess: false });

        expect(options.resetOnSuccess).toBe(false);
    });

    it('should be able to create static instance of form object', () => {
        const form = Form.create({ name: 'John Doe' });

        expect(form).toBeInstanceOf(Form);
        expect(form.getField('name')).toBe('John Doe');
    });

    it('can get all form data', () => {
        const form = new Form({ name: 'John Doe' });

        expect(form.getData()).toEqual({ name: 'John Doe' });
    });

    it('gets the form options', () => {
        const form = new Form({ name: 'John Doe' });

        expect(form.getOptions()).toEqual({
            resetOnSuccess: true,
            setInitialOnSuccess: false,
            preserveState: false,
            preserveScroll: false
        });
    });

    it('clear the form errors', () => {
        const form = new Form({ name: 'John Doe' });

        form.clearErrors();

        expect(form.hasErrors()).toBeFalsy();
    });

    it('makes get requests', async () => {
        const mockAdapter = new MockAdapter(axios);

        mockAdapter
            .onGet('/resource/1')
            .reply(200, { foo: 'bar' });

        const form = new Form({ foo: 'bar' });

        const results = await form.get('/resource/1', {
            onSuccess: ({ data, status }: any) => {
                expect(status).toBe(200);

                return data;
            }
        });

        expect(results.foo).toBe('bar');

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeTruthy();
        expect(form.hasErrors()).toBeFalsy();
    });

    it('submits form data properly', async () => {
        const mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('/login', {
            name: 'John Doe'
        }).reply(200, { name: 'John Doe' });
        const form = new Form({ name: 'John Doe' });

        await form.post('/login', {
            onSuccess: (response: any) => {
                expect(response.status).toBe(200);
                expect(response.data.name).toBe('John Doe');
            }
        });

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeTruthy();
        expect(form.hasErrors()).toBeFalsy();
    });

    it('can transform data object to FormData', async () => {
        const mockAdapter = new MockAdapter(axios);
        const form = new Form({
            __method: 'PUT',
            username: 'foo',
            password: 'bar',
            photo: null
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        form.data.photo = new File([new Uint8Array(10)], { type: 'image/png' });

        mockAdapter.onPut('/user/photo').reply((config) => {
            expect(config.data).toBeInstanceOf(FormData);
            expect(config.data.has('photo')).toBeTruthy();
            expect(config.data.has('username')).toBeTruthy();

            return [200, {}];
        });

        await form.post('/user/photo');
    });

    it('can set errors from the server', async () => {
        const mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('/login').reply(422, {
            errors: { username: ['The username field is required.'] }
        });

        const form = new Form({});

        try {
            await form.post('/login');
        } catch (error) {
            //
        }

        expect(form.hasErrors()).toBeTruthy();
        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeFalsy();
    });

    it('can define custom action on success', async () => {
        const mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('/login').reply(200, {
            foo: 'bar'
        });

        const form = new Form({});
        let result = '';

        await form.post('/login', {
            onSuccess: (response: any) => {
                result = response.data.foo;
            }
        });

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeTruthy();
        expect(result).toEqual('bar');
    });

    it('can define custom action on fail', async () => {
        const mockAdapter = new MockAdapter(axios);

        mockAdapter.onPost('/login').reply(422);

        const form = new Form({});
        let status = null;

        await form.post('/login', {
            onFail: (errors: any) => {
                status = errors.response.status;
            }
        });

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeFalsy();
        expect(status).toEqual(422);
    });

    it('can define custom on finish action', async () => {
        const mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('/login').reply(422);

        const form = new Form({});
        let status = '';

        await form.post('/login', {
            onFinish: () => {
                status = 'Finished';
            }
        });

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeFalsy();
        expect(status).toEqual('Finished');
    });

    it('can include auth token', async () => {
        const mockAdapter = new MockAdapter(axios);
        mockAdapter.onPost('/login').reply((config) => {
            return [200, { requestHeaders: config.headers }];
        });

        const form = new Form({}, { token: '12345' });
        let status = '';

        await form.post('/login', {
            onSuccess: ({ data }) => {
                expect(data.requestHeaders.Authorization).toBe('Bearer 12345');
            },

            onFinish: () => {
                status = 'Finished';
            }
        });

        expect(form.isProcessing()).toBeFalsy();
        expect(form.isSuccessful()).toBeTruthy();
        expect(status).toEqual('Finished');
    });
});
