export interface Handler {
    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {string|undefined}
     */
    get (field: string): string | undefined;

    /**
     * Get all the error messages for the given field.
     *
     * @param  {string} field
     *
     * @return {string[]}
     */
    getAll (field: string): string[];

    /**
     * Determine if the given field has an error.
     *
     * @param  {string}  field
     *
     * @return {boolean}
     */
    has (field: string): boolean;

    /**
     * Get all the errors in a flat array.
     *
     * @return {any[]}
     */
    flatten (): any[];

    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all (): object;

    /**
     * Record error messages object.
     *
     * @param  {object} errors
     *
     * @return {void}
     */
    record (errors: object): void;

    /**
     * Clear message of given error field.
     *
     * @param  {string} field
     *
     * @return {void}
     */
    clear (field?: string): void;

    /**
     * Determine if any error messages are available in all registered fields.
     *
     * @return {boolean}
     */
    any (): boolean;
}
