import { Http } from '../../enums/http';

export type HttpOptions = {
    /**
     * Determine if cross-site Access-Control requests should be made using credentials
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
     * @default false
     *
     * @var {boolean}
     */
    withCredentials: boolean,

    /**
     * The default response type for requests
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
     * @default json
     *
     * @var {Http.DEFAULT_RESPONSE_TYPE | string}
     */
    responseType: Http.DEFAULT_RESPONSE_TYPE | string,

    /**
     * The default response encoding for requests
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseEncoding
     * @default utf8
     *
     * @var {Http.DEFAULT_RESPONSE_ENCODING | string}
     */
    responseEncoding: Http.DEFAULT_RESPONSE_ENCODING | string,

    /**
     * The name of the cookie to use for XSRF
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
     * @default XSRF-TOKEN
     *
     * @var {Http.XSRF_COOKIE_NAME | string}
     */
    xsrfCookieName: Http.XSRF_COOKIE_NAME | string,

    /**
     * The name of the header to use for XSRF
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
     * @default X-XSRF-TOKEN
     *
     * @var {Http.XSRF_HEADER_NAME | string}
     */
    xsrfHeaderName: Http.XSRF_HEADER_NAME | string,

    /**
     * The maximum number of redirects to follow
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/maxRedirects
     * @default 21
     *
     * @var {number}
     */
    maxRedirects: number;

    /**
     * The base URL to use for all requests
     *
     * @var {string}
     */
    baseUrl?: string;
};
