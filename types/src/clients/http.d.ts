import { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import { Http as HttpInterface } from '../interfaces/clients/http';
import { HttpOptions } from '../interfaces/http/http-options';
import { HttpHeaders } from '../interfaces/http/http-headers';
export declare class Http implements HttpInterface {
    /**
     * HTTP handler configurations.
     *
     * @var {object}
     */
    config: HttpOptions;
    /**
     * The HTTP request headers.
     *
     * @var {HttpHeaders}
     */
    headers: HttpHeaders;
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
    constructor(client?: AxiosStatic);
    /**
     * Create new HTTP handler instance.
     *
     * @param   {HttpOptions|undefined}  config
     *
     * @return  {AxiosInstance}
     */
    createInstance(config?: CreateAxiosDefaults<HttpOptions>): AxiosInstance;
    /**
     * Set HTTP handler configurations.
     *
     * @param   {HttpOptions}  config
     *
     * @return  {Http}
     */
    withOptions(config: HttpOptions): Http;
    /**
     * Set headers to accept JSON response.
     *
     * @return  {Http}
     */
    acceptJson(): Http;
    /**
     * Set headers to accept JSON content type response.
     *
     * @param   {string}       type
     *
     * @return  {Http}
     */
    contentType(type?: string): Http;
    /**
     * Set default base urls.
     *
     * @param   {URL|string}       url
     *
     * @return  {Http}
     */
    baseUrl(url?: URL | string): Http;
    /**
     * Set authentication token.
     *
     * @param   {string}       token
     *
     * @return  {Http}
     */
    setToken(token?: string): Http;
    /**
     * Set request handler to accept credentials.
     *
     * @return  {Http}
     */
    withCredentials(): Http;
    /**
     * The Axios client instance.
     *
     * @return  {AxiosStatic|undefined}
     */
    getClient(): AxiosStatic | undefined;
}
//# sourceMappingURL=http.d.ts.map