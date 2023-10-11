import _ from 'lodash';
import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import { Http as HttpInterface } from '../interfaces/clients/http';
import { Http as HttpEnum } from '../enums/http';
import { HttpOptions } from '../interfaces/http/http-options';
import { HttpHeaders } from '../interfaces/http/http-headers';

export class Http implements HttpInterface {
    /**
     * HTTP handler configurations.
     *
     * @var {object}
     */
    public config: HttpOptions = {
        withCredentials: false,
        responseType: HttpEnum.DEFAULT_RESPONSE_TYPE as string,
        responseEncoding: HttpEnum.DEFAULT_RESPONSE_ENCODING as string,
        xsrfCookieName: HttpEnum.XSRF_COOKIE_NAME as string,
        xsrfHeaderName: HttpEnum.XSRF_HEADER_NAME as string,
        maxRedirects: HttpEnum.MAX_REDIRECTS as number
    };

    /**
     * The HTTP request headers.
     *
     * @var {HttpHeaders}
     */
    public headers: HttpHeaders = {
        'X-Requested-With': HttpEnum.X_REQUESTED_WITH as string
    };

    /**
     * The Axios client instance.
     *
     * @var {AxiosStatic}
     */
    protected client?: AxiosStatic;

    /**
     * Create new HTTP handler instance.
     *
     * @param   {AxiosStatic|undefined}  client
     *
     * @return  {void}
     */
    constructor (client?: AxiosStatic) {
        this.client = client;
    }

    /**
     * Create new HTTP handler instance.
     *
     * @param   {HttpOptions|undefined}  config
     *
     * @return  {AxiosInstance}
     */
    public createInstance (
        config?: CreateAxiosDefaults<HttpOptions>
    ): AxiosInstance {
        config = _.merge(
            this.config,
            { headers: this.headers },
            config || {}
        );

        return (this.client || axios).create(config);
    }

    /**
     * Set HTTP handler configurations.
     *
     * @param   {HttpOptions}  config
     *
     * @return  {Http}
     */
    public withOptions (config: HttpOptions): Http {
        _.merge(this.config, config);

        return this;
    }

    /**
     * Set headers to accept JSON response.
     *
     * @return  {Http}
     */
    public acceptJson (): Http {
        _.set(this.headers, 'Accept', 'application/json');

        return this;
    }

    /**
     * Set headers to accept JSON content type response.
     *
     * @param   {string}       type
     *
     * @return  {Http}
     */
    public contentType (type?: string): Http {
        _.set(
            this.headers, 'Content-Type',
            type || HttpEnum.DEFAULT_CONTENT_TYPE as string
        );

        return this;
    }

    /**
     * Set default base urls.
     *
     * @param   {URL|string}       url
     *
     * @return  {Http}
     */
    public baseUrl (url?: URL | string): Http {
        if (!url) {
            return this;
        }

        _.set(this.config, 'baseUrl', url);

        return this;
    }

    /**
     * Set authentication token.
     *
     * @param   {string}       token
     *
     * @return  {Http}
     */
    public setToken (token?: string): Http {
        if (!token) {
            return this;
        }

        _.set(this.headers, 'Authorization', `Bearer ${token}`);

        return this;
    }

    /**
     * Set request handler to accept credentials.
     *
     * @return  {Http}
     */
    public withCredentials (): Http {
        _.set(this.config, 'withCredentials', true);

        return this;
    }

    /**
     * The Axios client instance.
     *
     * @return  {AxiosStatic|undefined}
     */
    public getClient (): AxiosStatic | undefined {
        return this.client;
    }
}
