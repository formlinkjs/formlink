export type ErrorData = {
    /**
     * The error message.
     *
     * @var {string|undefined}
     */
    message?: string;

    /**
     * The error status code.
     *
     * @var {number}
     */
    errors?: { [key: string]: string[]; };
};
