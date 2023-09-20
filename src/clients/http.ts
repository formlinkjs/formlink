import _ from 'lodash';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { Http as HttpInterface } from '@/interfaces/clients/http';
import { Http as HttpEnum } from '@/enums/http';

export class Http implements HttpInterface {
    /**
     * HTTP handler configurations.
     *
     * @var {object}
     */
    public config: { [key: string]: any; } = {
        withCredentials: false,
        responseType: HttpEnum.DEFAULT_RESPONSE_TYPE,
        responseEncoding: HttpEnum.DEFAULT_RESPONSE_ENCODING,
        xsrfCookieName: HttpEnum.XSRF_COOKIE_NAME,
        xsrfHeaderName: HttpEnum.XSRF_HEADER_NAME,
        maxRedirects: HttpEnum.MAX_REDIRECTS
    };

    /**
     * The HTTP request headers.
     *
     * @var {object}
     */
    public headers: { [key: string]: any; } = {
        'X-Requested-With': HttpEnum.X_REQUESTED_WITH
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
     * @param   {AxiosStatic}  client
     *
     * @return  {void}
     */
    constructor (client?: AxiosStatic) {
        this.client = client;
    }

    /**
     * Create new HTTP handler instance.
     *
     * @param   {object}  config
     *
     * @return  {Http}
     */
    public createInstance (config?: object): AxiosInstance {
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
     * @param   {object}  config
     *
     * @return  {Http}
     */
    public withOptions (config: object): Http {
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
        _.set(this.headers, 'Content-Type', type || 'application/json');

        return this;
    }

    /**
     * Set default base urls.
     *
     * @param   {string}       url
     *
     * @return  {Http}
     */
    public baseUrl (url: string): Http {
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
