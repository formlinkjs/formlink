import { Http } from '../../enums/http';
export type HttpOptions = {
    withCredentials: boolean;
    responseType: Http.DEFAULT_RESPONSE_TYPE | string;
    responseEncoding: Http.DEFAULT_RESPONSE_ENCODING | string;
    xsrfCookieName: Http.XSRF_COOKIE_NAME | string;
    xsrfHeaderName: Http.XSRF_HEADER_NAME | string;
    maxRedirects: number;
    baseUrl?: string;
};
//# sourceMappingURL=http-options.d.ts.map