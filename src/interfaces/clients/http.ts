import { AxiosInstance } from 'axios';

export interface Http {
    /**
     * HTTP handler configurations.
     *
     * @var {object}
     */
    config: { [key: string]: any; };

    /**
     * The HTTP request headers.
     *
     * @var {object}
     */
    headers: { [key: string]: any; };

    /**
     * Create new HTTP handler instance.
     *
     * @param   {object}  config
     *
     * @return  {Http}
     */
    createInstance (config?: object): AxiosInstance;

    /**
     * Set HTTP handler configurations.
     *
     * @param   {object}  config
     *
     * @return  {Http}
     */
    withOptions (config: object): Http;

    /**
     * Set headers to accept JSON response.
     *
     * @return  {Http}
     */
    acceptJson (): Http;

    /**
     * Set headers to accept JSON content type response.
     *
     * @param   {string}       type
     *
     * @return  {Http}
     */
    contentType (type?: string): Http;

    /**
     * Set default base urls.
     *
     * @param   {string}       url
     *
     * @return  {Http}
     */
    baseUrl (url: string): Http;

    /**
     * Set authentication token.
     *
     * @param   {string}       token
     *
     * @return  {Http}
     */
    setToken (token?: string): Http;

    /**
     * Set request handler to accept credentials.
     *
     * @return  {Http}
     */
    withCredentials (): Http;
}
