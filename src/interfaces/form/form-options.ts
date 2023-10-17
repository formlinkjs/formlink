import { AxiosStatic } from 'axios';
import { Handler as ErrorHandlerInterface } from '../exceptions/handler';
import { Response } from '../http/response';
import { ErrorResponse } from '../exceptions/error-response';

export type FormOptions = {
    /**
     * Reset form input values when request is successful.
     *
     * @var {boolean}
     */
    resetOnSuccess?: boolean,

    /**
     * Set initial form input values when request is successful.
     *
     * @var {boolean}
     */
    setInitialOnSuccess?: boolean;

    /**
     * Preserve the state of the page after request is successful.
     *
     * @var {boolean}
     */
    preserveState?: boolean;

    /**
     * Preserve the scroll position after request is successful.
     *
     * @var {boolean}
     */
    preserveScroll?: boolean;

    /**
     * The base URL for all requests.
     *
     * @var {URL|string}
     */
    baseUrl?: URL | string;

    /**
     * The API/Bearer authentication token.
     */
    token?: string;

    /**
     * The HTTP client instance.
     *
     * @var {AxiosStatic}
     */
    http?: AxiosStatic;

    /**
     * The error handler instance.
     *
     * @var {ErrorHandlerInterface}
     */
    errorHandler?: ErrorHandlerInterface;

    /**
     * Get the values of the given form fields only.
     *
     * @var {string[]}
     */
    only?: string[],

    /**
     * Callback to be executed before the request is sent.
     *
     * @var {Function}
     */
    onBefore?: () => void;

    /**
     * Callback to be executed when the request is cancelled.
     *
     * @var {Function}
     */
    onCancel?: () => void;

    /**
     * Callback to be executed when the request is successful.
     *
     * @var {Function}
     */
    onSuccess?: (response: Response) => void;

    /**
     * Callback to be executed when the request fails.
     *
     * @var {Function}
     */
    onFail?: (error: ErrorResponse) => void;

    /**
     * Callback to be executed when the request is completed.
     *
     * @var {Function}
     */
    onFinish?: () => void;
};
