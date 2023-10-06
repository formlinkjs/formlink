import { ErrorObject as ErrorObjectType } from '../interfaces/exceptions/error-object';
export declare class ErrorObject implements ErrorObjectType {
    /**
     * The field the error belongs to.
     *
     * @var {string}
     */
    field: string;
    /**
     * The description of the error in detail.
     *
     * @var {string|string[]}
     */
    message: string | string[];
    /**
     * Create a new error object instance.
     *
     * @param {string} field
     * @param {string|string[]} message
     *
     * @return {void}
     */
    constructor(field: string, message: string | string[]);
    /**
     * Represent the error object as a string by returning the error message.
     *
     * @return {string}
     */
    toString(): string;
}
//# sourceMappingURL=error-object.d.ts.map