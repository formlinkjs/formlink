import { ErrorObject as ErrorObjectInterface } from '../interfaces/exceptions/error-object';

export class ErrorObject implements ErrorObjectInterface {
    /**
     * The error message.
     *
     * @var {string}
     */
    public error: string;

    /**
     * The description of the error in detail.
     *
     * @var {string}
     */
    public message: string | string[];

    /**
     * The error status code.
     *
     * @var {number}
     */
    public statusCode: number;

    /**
     * Create a new error object instance.
     *
     * @param {string} error
     * @param {string|string[]} message
     * @param {number} statusCode
     *
     * @return {void}
     */
    constructor (
        error: string,
        message: string | string[],
        statusCode: number
    ) {
        this.error = error;
        this.message = message;
        this.statusCode = statusCode;
    }
}
