import _ from 'lodash';
import { Handler as ExceptionHadlder } from '@/interfaces/exceptions/handler';

export class Handler implements ExceptionHadlder {
    /**
     * The errors object.
     *
     * @var {object}
     *
     **/
    protected errors: { [key: string]: any; } = {};

    /**
     * Create new errors handler instance.
     *
     * @param  {object} errors
     *
     * @return {void}
     */
    constructor (errors: { [key: string]: any; } = {}) {
        this.errors = errors;
    }

    /**
     * Get first error message for given field.
     *
     * @param  {string} field
     *
     * @return {string|undefined}
     */
    public get (field: string): string | undefined {
        return _.get(this.errors, `${field}.0`, undefined);
    }

    /**
     * Get all the error messages for the given field.
     *
     * @param  {string} field
     *
     * @return {string[]}
     */
    public getAll (field: string): string[] {
        const result = this.errors[field] || [];

        return _.isArray(result) ? result : _.castArray(result);
    }

    /**
     * Determine if the given field has an error.
     *
     * @param  {string}  field
     *
     * @return {boolean}
     */
    public has (field: string): boolean {
        return _.has(this.errors, field);
    }

    /**
     * Get all the errors in a flat array.
     *
     * @return {any[]}
     */
    public flatten (): any[] {
        return _.reduce(_.values(this.errors), (carry, element) => {
            return carry.concat(element);
        }, []);
    }

    /**
     * Get all the errors.
     *
     * @return {object}
     */
    public all (): object {
        return this.errors;
    }

    /**
     * Record error messages object.
     *
     * @param  {object} errors
     *
     * @return {void}
     */
    public record (errors: object): void {
        this.errors = errors;
    }

    /**
     * Clear message of given error field.
     *
     * @param  {string} field
     *
     * @return {void}
     */
    public clear (field?: string): void {
        if (field) {
            _.unset(this.errors, field);

            return;
        }

        this.errors = {};
    }

    /**
     * Determine if any error messages are available in all registered fields.
     *
     * @return {boolean}
     */
    public any (): boolean {
        if (!this.errors) {
            return true;
        }

        return Boolean(_.keys(this.errors).length > 0);
    }
}
