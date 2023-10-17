import { Http } from '../../enums/http';

export type HttpHeaders = {
    /**
     * The `Accept` header field can be used by user agents to specify response media types that are acceptable.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
     *
     * @var {Http.DEFAULT_CONTENT_TYPE | string}
     */
    Accept?: Http.DEFAULT_CONTENT_TYPE | string,

    /**
     * The `Content-Type` entity header is used to indicate the media type of the resource.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
     *
     * @var {Http.DEFAULT_CONTENT_TYPE | string}
     */
    'Content-Type'?: Http.DEFAULT_CONTENT_TYPE | string,

    /**
     * The `Authorization` request header contains the credentials to authenticate a user agent with a server,
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
     *
     * @var {string}
     */
    Authorization?: string;

    /**
     * The `X-Requested-With` header can be used to identify Ajax requests.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Requested-With
     *
     * @var {Http.X_REQUESTED_WITH | string}
     */
    'X-Requested-With'?: Http.X_REQUESTED_WITH | string;
};
