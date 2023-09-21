import { describe, it, expect, beforeEach } from 'vitest';
import { Http } from './http';
import { HttpOptions } from '@/interfaces/support/http-options';

describe('Http', () => {
    let http: Http;

    beforeEach(() => {
        http = new Http();
    });

    it('should create an instance of Http with default values', () => {
        expect(http).instanceOf(Http);
        expect(http.config.withCredentials).toBe(false);
        expect(http.config.responseType).toBe('json');
        expect(http.headers['X-Requested-With']).toBe('XMLHttpRequest');
    });

    it('should create an instance of Http with a custom Axios client', () => {
        const customClient = {} as any;
        const http = new Http(customClient);

        expect(http.getClient()).toBe(customClient);
    });

    it('should create an AxiosInstance with merged configurations', () => {
        const instance = http.createInstance({
            headers: { 'Custom-Header': 'Custom-Value' },
        });

        expect(instance.defaults.withCredentials).toBe(false);
        expect(instance.defaults.responseType).toBe('json');
        expect(instance.defaults.headers['X-Requested-With']).toBe('XMLHttpRequest');
        expect(instance.defaults.headers['Custom-Header']).toBe('Custom-Value');
    });

    it('should merge and update configuration options', () => {
        http.withOptions({ withCredentials: true } as HttpOptions);

        expect(http.config.withCredentials).toBe(true);
    });

    it('should set Accept header to application/json', () => {
        http.acceptJson();

        expect(http.headers.Accept).toBe('application/json');
    });

    it('should set Content-Type header to the specified type', () => {
        http.contentType('application/xml');

        expect(http.headers['Content-Type']).toBe('application/xml');
    });

    it('should default to application/json if no type is specified', () => {
        http.contentType();

        expect(http.headers['Content-Type']).toBe('application/json');
    });

    it('should set the base URL in the configuration', () => {
        http.baseUrl('https://example.com/api');

        expect(http.config['baseUrl']).toBe('https://example.com/api');
    });

    it('should not set the base URL if an empty string is provided', () => {
        http.baseUrl('');

        expect(http.config['baseUrl']).toBe(undefined);
    });

    it('should set the Authorization header with the provided token', () => {
        http.setToken('mytoken');

        expect(http.headers.Authorization).toBe('Bearer mytoken');
    });

    it('should not set the Authorization header if no token is provided', () => {
        http.setToken();

        expect(http.headers['Authorization']).toBe(undefined);
    });

    it('should set withCredentials in the configuration', () => {
        http.withCredentials();

        expect(http.config.withCredentials).toBe(true);
    });
});
