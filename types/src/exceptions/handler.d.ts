import { Handler as ExceptionHadlder } from '../interfaces/exceptions/handler';
import { ErrorObject } from '../interfaces/exceptions/error-object';
import { ErrorRepsonse } from '../interfaces/exceptions/error-response';
export declare class Handler implements ExceptionHadlder {
    /**
     * The errors array.
     *
     * @var {ErrorObject[]}
     */
    protected errors: ErrorObject[];
    /**
     * The error status code.
     *
     * @var {number}
     */
    status: number;
    /**
     * Create new errors handler instance.
     *
     * @param  {ErrorRepsonse} errors
     *
     * @return {void}
     */
    constructor(errors?: ErrorRepsonse);
    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {string|undefined}
     */
    get(field: string): string | undefined;
    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {ErrorObject|undefined}
     */
    getRaw(field: string): ErrorObject | undefined;
    /**
     * Get all the error messages for the given field.
     *
     * @param  {string} field
     *
     * @return {string[]}
     */
    getAll(field: string): string[];
    /**
     * Determine if the given field has an error.
     *
     * @param  {string}  field
     *
     * @return {boolean}
     */
    has(field: string): boolean;
    /**
     * Get all the errors in a flat array.
     *
     * @return {string[]}
     */
    flatten(): string[];
    /**
     * Get all the errors.
     *
     * @return {ErrorObject[]}
     */
    all(): ErrorObject[];
    /**
     * Record error messages object.
     *
     * @param  {ErrorRepsonse} errors
     *
     * @return {void}
     */
    record(errors: ErrorRepsonse): void;
    /**
     * Parse errors object.
     *
     * @param  {object} errors
     *
     * @return {object}
     */
    parseErrors(errors: ErrorRepsonse): ErrorObject[];
    /**
     * Clear message of given error field.
     *
     * @param  {string} field
     *
     * @return {void}
     */
    clear(field?: string): void;
    /**
     * Determine if any error messages are available in all registered fields.
     *
     * @return {boolean}
     */
    any(): boolean;
    /**
     * Set the status code for the error.
     *
     * @param  {number} status
     *
     * @return {void}
     */
    setStatusCode(status: number): void;
    /**
     * Get the status code for the error.
     *
     * @return {number}
     */
    getStatusCode(): number;
}
//# sourceMappingURL=handler.d.ts.map