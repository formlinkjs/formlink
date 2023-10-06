import { ErrorObject } from './error-object';
import { ErrorRepsonse } from './error-response';
export interface Handler {
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
     * @return {any[]}
     */
    flatten(): any[];
    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all(): object;
    /**
     * Record error messages object.
     *
     * @param  {ErrorRepsonse} errors
     *
     * @return {void}
     */
    record(errors: ErrorRepsonse): void;
    /**
     * Clear message of given error field.
     *
     * @param  {string} field
     *
     * @return {void}
     */
    clear(field?: string): void;
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
    /**
     * Determine if any error messages are available in all registered fields.
     *
     * @return {boolean}
     */
    any(): boolean;
}
//# sourceMappingURL=handler.d.ts.map