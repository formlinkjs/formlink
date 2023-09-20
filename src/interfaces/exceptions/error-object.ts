export interface ErrorObject {
    /**
     * The error message.
     *
     * @var {string}
     */
    error: string;

    /**
     * The description of the error in detail.
     *
     * @var {string}
     */
    message: string | string[];

    /**
     * The error status code.
     *
     * @var {number}
     */
    statusCode: number;
}
